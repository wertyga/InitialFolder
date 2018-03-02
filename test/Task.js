import Queue from '../server/models/Queue';
import chai from'chai';
import chaiHttp from'chai-http';

const should = chai.should();

chai.use(chaiHttp);

describe('Queue', () => {
    beforeEach((done) => {
        Queue.remove({}, (err) => {
            done();
        });
    });

    describe('/POST edit-image', () => {
        it('it should return object with "file" property', (done) => {
            const options = {
                crop: '90x90',
                filter: 'sepia',
                url: 'https://www.istockphoto.com/resources/images/PhotoFTLP/img_67920257.jpg'
            };
            chai.request('http://localhost:3000')
                .post('/api/edit-image')
                .send(options)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('file');

                    console.log(res.body)
                    done();
                });
        }).timeout(10000);

        it('it should return object with "ERROR" property', (done) => {
            const options = {};
            chai.request('http://localhost:3000')
                .post('/api/edit-image')
                .send(options)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');

                    console.log(res.body)
                    done();
                });
        }).timeout(10000);

        it('it should return "ERRORS" object with GLOBAL ERROR', (done) => {
            const options = {
                crop: '90x90',
                filter: 'sepia',
                url: 'No URI'
            };
            chai.request('http://localhost:3000')
                .post('/api/edit-image')
                .send(options)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('errors');
                    res.body.errors.should.have.property('globalError');

                    console.log(res.body)
                    done();
                });
        }).timeout(10000);
    });

});