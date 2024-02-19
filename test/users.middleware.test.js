const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');
const sinon = require('sinon');
const fetchuser = require('../middleware/users');

const { expect } = chai;

chai.use(chaiHttp);

describe('fetchuser middleware', () => {
    const JWT_PRIVATEKEY = "Nani@shiv0101";

    it('should set req.user and call next() if a valid token is provided', () => {
        const token = jwt.sign({ user: { userId: '123' } }, JWT_PRIVATEKEY);
        const req = { cookies: { authtoken: token } };
        const res = {};
        const next = sinon.spy();

        fetchuser(req, res, next);

        expect(req.user).to.deep.equal({ userId: '123' });
        expect(next.calledOnce).to.be.true;
    });

    it('should return an error if no token is provided', () => {
        const req = { cookies: {} };
        const res = { status: sinon.stub().returns({ send: sinon.stub() }) };
        const next = sinon.spy();

        fetchuser(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 401);
        sinon.assert.calledOnce(res.status().send);
        sinon.assert.calledWith(res.status().send, { error: 'Please authenticate using a valid token' });
        sinon.assert.notCalled(next);
    });

    it('should return an error if the token is expired', () => {
        const token = jwt.sign({ user: { userId: '123' } }, JWT_PRIVATEKEY, { expiresIn: '-1s' });
        const req = { cookies: { authtoken: token } };
        const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
        const next = sinon.spy();

        fetchuser(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 401);
        sinon.assert.calledOnce(res.status().json);
        sinon.assert.calledWith(res.status().json, { error: 'Token expired. Please re-authenticate.' });
        sinon.assert.notCalled(next);
    });

    it('should return an error if the token is invalid', () => {
        const req = { cookies: { authtoken: 'invalid-token' } };
        const res = { status: sinon.stub().returns({ json: sinon.stub() }) };
        const next = sinon.spy();

        fetchuser(req, res, next);

        sinon.assert.calledOnce(res.status);
        sinon.assert.calledWith(res.status, 401);
        sinon.assert.calledOnce(res.status().json);
        sinon.assert.calledWith(res.status().json, { error: 'Invalid token.' });
        sinon.assert.notCalled(next);
    });
});
