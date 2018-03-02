import path from 'path';

const env = process.env.NODE_ENV;

export default {
    PORT: 3000,
    mongoose: {
        uri: env.trim() === 'test' ? 'mongodb://localhost/hqo-test' : 'mongodb://localhost/hqo',
        options: {
            server: {
                socketOptions: {
                    keepAlive: 1
                }
            }
        }
    },
    session: {
        secret: "nodeJSForever",
        key: "sid",
        cookie: {
            secure: false,
            sameSite: true,
            httpOnly: true,
            maxAge: 3600000
        }
    },
    hash: {
        secret: 'boooom!',
        salt: 10
    },
    uploads: {
        directory: 'temp',
        destination: path.join(__dirname, '../', 'temp')
    }
}