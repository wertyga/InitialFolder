import amqp from 'amqplib/callback_api';

import Queue from './models/Queue';

import Jimp from 'jimp';

let amqpConn = null;
export default function start() {
    amqp.connect('amqp://localhost', function(err, conn) {
        if (err) {
            console.error("[AMQP]", err.message);
            return setTimeout(start, 1000);
        }
        conn.on("error", function(err) {
            if (err.message !== "Connection closing") {
                console.error("[AMQP] conn error", err.message);
            }
        });
        conn.on("close", function() {
            console.error("[AMQP] reconnecting");
            return setTimeout(start, 1000);
        });
        console.log("[AMQP] connected");
        amqpConn = conn;
        whenConnected();
    });
};

let pubChannel = null;
function startPublisher() {
    amqpConn.createConfirmChannel(function(err, ch) {
        if (closeOnErr(err)) return;
        ch.on("error", function(err) {
            console.error("[AMQP] channel error", err.message);
        });
        ch.on("close", function() {
            console.log("[AMQP] channel closed");
        });

        pubChannel = ch;
    });
};

export function publish(exchange, routingKey, content) {
    try {
        pubChannel.publish(exchange, routingKey, content, { persistent: true },
            function(err, ok) {
                if (err) {
                    console.error("[AMQP] publish", err);

                    pubChannel.connection.close();
                };
            });
    } catch (e) {
        console.error("[AMQP] publish", e.message);
    }
};
let res;
export function startWorker(user, response) {
    res = response;
        amqpConn.createChannel(function(err, ch) {
            if (closeOnErr(err)) return;
            ch.on("error", function(err) {
                console.error("[AMQP] channel error", err.message);
            });
            ch.on("close", function() {
                console.log("[AMQP] channel closed");
            });

            ch.prefetch(10);
            ch.assertQueue(user, {durable: true}, function(err, q) {
                if (closeOnErr(err)) return;
                ch.consume(user, processMsg, { noAck: false });
                console.log("Worker is started");
            });

            function processMsg(msg) {
                work(msg, function(ok) {
                    try {
                        if (ok)
                            ch.ack(msg);
                        else
                            ch.reject(msg, true);
                    } catch (e) {
                        closeOnErr(e);
                    }
                });
            };
        })

};

function work(msg, cb) {
    const { url, crop, filter, _id } = JSON.parse(msg.content.toString());
    Jimp.read(url)
        .then(image => {
            const width = +crop.split('x')[0];
            const height = +crop.split('x')[1];

            image.resize(width, height);
            if(filter) image[filter]();
            image.write(url);

            Queue.findById(_id)
                .then(task => {
                    if(!task) {
                        throw new Error('No such task')
                    };
                    task.done = true;
                    task.save().then(() => {
                        cb(true);
                        res.json({ file: _id })
                    });
                });
    }).catch(function (err) {
        res.status(500).json({ errors: { globalError: err.message } });
        cb(false);
    });


};

function whenConnected() {
    startPublisher();
};

function closeOnErr(err) {
    if (!err) return false;
    console.error("[AMQP] error", err);
    amqpConn.close();
    return true;
};