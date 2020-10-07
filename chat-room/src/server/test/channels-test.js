var assert = require('assert');
// var app = require('../index');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe('Server test', function() {

    before(function() {
        console.log("before test");
    });

    // The function passed to after() is called after running the test cases.
    after(function() {
        console.log("after test");
    });

    describe('/api/channels', () => {
        it('it should GET all the channels', (done) => {
            chai.request('http://localhost:3000') //'http://localhost:3000'
                .get('/api/channels')
                .end((err, res) => {
                    console.log('res' + res);
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    // res.body.length.should.be.eql(3);
                    done();
                });
        });
    });

    //
    describe('/api/channels', () => {
        it('it should indert a channel', (done) => {
            chai.request('http://localhost:3000') //'http://localhost:3000'
                .post('/api/channels').type('form')
                .send({
                    'name': 'channeltestname',
                    'group_id': 1
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('num');
                    res.body.should.have.property('err');
                    console.log(res.body);
                    done();
                });
        });
    });

});