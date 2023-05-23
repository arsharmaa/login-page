const chai = require('chai');
const chaiHttp = require('chai-http');
const exp = require('constants');
const crypto = require('crypto');

chai.use(chaiHttp);
const expect = chai.expect;

const hashedPassword = crypto.createHash('sha256').update("password").digest('hex');

describe('POST /api/login', () => {    
    it('should return success when username and password are correct', (done) => {
        chai.request('http://localhost:3001')
        .post('/api/login')
        .send({ username: 'username', password: hashedPassword })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(true);
            done();
        });
    });
    
    it('should return failure when username is incorrect', (done) => {
        chai.request('http://localhost:3001')
        .post('/api/login')
        .send({ username: 'wrong', password: hashedPassword })
        .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Authentication failed');
            done();
        });
    });
    
    it('should return failure when password is incorrect', (done) => {
        chai.request('http://localhost:3001')
        .post('/api/login')
        .send({ username: 'username', password: 'wrongUnhashedPassword' })
        .end((err, res) => {
            expect(res).to.have.status(401);
            expect(res.body).to.be.an('object');
            expect(res.body.success).to.equal(false);
            expect(res.body.message).to.equal('Authentication failed');
            done();
        });
    });
});