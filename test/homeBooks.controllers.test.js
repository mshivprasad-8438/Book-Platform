const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');
const { removedBook } = require('../controllers/homeBooks');
const bookModel = require('../model/itemsModel')
const mongoose = require('mongodb');
const app = require('../app');
const request = supertest(app);

describe('Testing Router', () => {
    afterEach(() => {
        sinon.restore();
    });

    describe(' Home Book', () => {
        it('should render home page with auth cookie', async () => {

            //Stub the functions
            sinon.stub(jwt, 'verify').returns({ user: { id: "123456789012345678901234" } });
            sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
            sinon.stub(mongoose, 'ObjectId').returns("1234567890");

            //Call the function
            let res = await request
                .get('/userauth/home')
                .set('Cookie', ['authtoken=test-token'])

            //Assert
            expect(res.status).to.equal(200);
            expect(res.text).to.include('<title>Home</title>');
        });

        it('should render home page without auth cookie', async () => {

            //Stub the functions
            // sinon.stub(jwt,'verify').returns({user:{id: "123456789012345678901234"}});
            sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
            // sinon.stub(mongoose,'ObjectId').returns("1234567890");

            //Call the function
            let res = await request
                .get('/userauth/home')

            //Assert
            expect(res.status).to.equal(200);
            expect(res.text).to.include('<title>Home</title>');
        });

        it('should render home page with auth cookie but with error', async () => {

            //Stub the functions
            sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

            //Call the function
            let res = await request
                .get('/userauth/home')
                .set('Cookie', ['authtoken=test-token'])

            //Assert
            expect(res.status).to.equal(401);
            expect(res.text).to.include('Invalid token.');
        });
    });

    
    
    describe('Remove books', () => {
        req = { body: { _uid: 'wgthyjui34567vt' } }
        res = {
            render: sinon.spy()
        }
        it('should render home page after remove operation', async () => {
            // Stub the relevant functions
            sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
            await removedBook(req, res)
            expect(res.render.calledOnce).to.be.true;

        })

        it('should give error if request is improper', async () => {
            req = {}
            res = {
                render: sinon.spy(),
                send: sinon.spy()
            }
            
            sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
            let x = await removedBook(req, res)
            console.log(x)
            expect(res.send.calledOnce).to.be.true;
        })
    });

});




