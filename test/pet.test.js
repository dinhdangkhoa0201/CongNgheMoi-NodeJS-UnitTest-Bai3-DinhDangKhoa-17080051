process.env.NODE_ENV = 'test';

let chai = require('chai');
let chatHttp = require('chai-http');
let indexServer = require('../index');
let should = chai.should();
chai.use(chatHttp);

describe('Pets', () => {
    beforeEach((done) => {
        /**
         * before each test we empty the database in your case
         */
        done();
    });

    /**
     * Test the /GET route
     */

    describe('/GET pets', () => {
        it('it should GET all the pets', (done) => {
            chai.request(indexServer)
                .get('/pets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(9);
                    done();
                })
        });
    });

    /**
     * Test the /POST route
     */

    describe('/POST pets', () => {
        it('it should POST a pet', (done) => {
            let pet = {
                name: 'Bug',
                status: 'detected',
            }

            chai.request(indexServer)
                .post('/pets')
                .send(pet)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet successfully added!');
                    res.body.pet.should.have.property('id');
                    res.body.pet.should.have.property('name').eql(pet.name);
                    res.body.pet.should.have.property('status').eql(pet.status);
                    done();
                })
        });

        it('it should not a POST a book without status field', (done) => {
            let pet = {
                name: 'Bug'
            }

            chai.request(indexServer)
                .post('/pets')
                .send(pet)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet is invalid!');
                    done();
                })
        });
    });

    /**
     * Test the /GET/:id route
     */

    describe('/GET/:id pets', () => {
        it('it should GET a pet by the given id', (done) => {
            let id = 1;
            chai.request(indexServer)
                .get('/pets/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('pet');
                    res.body.pet.should.have.property('id').eql(id);
                    res.body.pet.should.have.property('name');
                    res.body.pet.should.have.property('status');
                    done();
                })
        });
    })

    /**
     * Test the /PUT/:id route
     */

    describe('/PUT/:id pets', () => {
        it('it should UPDATE a pet given the id', (done) => {
            let id = 1;
            chai.request(indexServer)
                .put('/pets/' + id)
                .send({
                    name: 'Bug',
                    status: 'fixed'
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.pet.should.have.property('name').eql('Bug');
                    res.body.pet.should.have.property('status').eql('fixed');
                    done();
                });
        });
    })

    /**
     * Test the /DELETE/:id route
     */

    describe('/DELETE/:id pets', () => {
        it('it should DELETE a pet given the id', (done) => {
            let id = 1;
            chai.request(indexServer)
                .delete('/pets/' + id)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Pet successfully deleted!');
                    res.body.should.have.property('result');
                    res.body.result.should.have.property('rowEffected').eql(1);
                    done();
                });
        });
    })
})
