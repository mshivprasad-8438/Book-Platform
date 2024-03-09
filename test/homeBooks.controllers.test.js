// const chai = require('chai');
// const expect = chai.expect;
// const sinon = require('sinon');
// const supertest = require('supertest');
// const jwt = require('jsonwebtoken');
// const { removedBook,bookFind } = require('../controllers/homeBooks');
// const bookModel = require('../model/itemsModel')
// const mongoose = require('mongodb');
// const app = require('../app');
// const request = supertest(app);

// describe('Testing Router', () => {
//     afterEach(() => {
//         sinon.restore();
//     });
//     describe('Book Find Function', () => {
//         it('should handle search with searchTerm and render home page with search results', async () => {
//             // Stub the functions
//             sinon.stub(bookModel, 'aggregate').resolves([{ title: "Test Book", author: "Test Author" }]);
//             sinon.stub(request, 'get').returns({ set: () => {}, status: 200, text: '<title>Home</title>' });

//             const req = {
//                 body: { search: 'test' },
//                 cookies: { authtoken: 'test-token' }
//             };
//             // Call the function
//             let res = await bookFind(req, { status: () => {}, render: () => {} });
    
//             // Assert
//             expect(res.status).to.equal(200);
//             expect(res.text).to.include('<title>Home</title>');
//             // Add more assertions based on the expected behavior when search results are available
//         });
    
//         it('should handle search with empty searchTerm and render home page with available books', async () => {
//             // Stub the functions
//             sinon.stub(bookModel, 'aggregate').resolves([]);
//             sinon.stub(bookModel, 'find').resolves([{ title: "Test Book", author: "Test Author", availability: true }]);
    
//             // Call the function
//             let res = await bookFind({ body: { search: '' } }, { status: () => {}, render: () => {} });
    
//             // Assert
//             expect(res.status).to.equal(200);
//             // Add more assertions based on the expected behavior when no search term is provided
//         });
    
//         it('should handle search with invalid token and return 401 status', async () => {
//             // Stub the functions
//             sinon.stub(bookModel, 'aggregate').throws(new Error('Database error'));
//             sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));
    
//             // Call the function
//             let res = await bookFind({ body: { search: 'test' }, cookies: { authtoken: 'test-token' } }, { status: () => {}, render: () => {} });
    
//             // Assert
//             expect(res.status).to.equal(401);
//             expect(res.json).to.be.calledWithExactly({ error: 'Invalid token.' });
//         });
//     });
    
//     describe(' Home Book', () => {
//         it('should render home page with auth cookie', async () => {

//             //Stub the functions
//             sinon.stub(jwt, 'verify').returns({ user: { id: "123456789012345678901234" } });
//             sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
//             sinon.stub(mongoose, 'ObjectId').returns("1234567890");

//             //Call the function
//             let res = await request
//                 .get('/userauth/home')
//                 .set('Cookie', ['authtoken=test-token'])

//             //Assert
//             expect(res.status).to.equal(200);
//             expect(res.text).to.include('<title>Home</title>');
//         });

//         it('should render home page without auth cookie', async () => {

//             //Stub the functions
//             // sinon.stub(jwt,'verify').returns({user:{id: "123456789012345678901234"}});
//             sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
//             // sinon.stub(mongoose,'ObjectId').returns("1234567890");

//             //Call the function
//             let res = await request
//                 .get('/userauth/home')

//             //Assert
//             expect(res.status).to.equal(200);
//             expect(res.text).to.include('<title>Home</title>');
//         });

//         it('should render home page with auth cookie but with error', async () => {

//             //Stub the functions
//             sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

//             //Call the function
//             let res = await request
//                 .get('/userauth/home')
//                 .set('Cookie', ['authtoken=test-token'])

//             //Assert
//             expect(res.status).to.equal(401);
//             expect(res.text).to.include('Invalid token.');
//         });
//     });

    
    
//     describe('Remove books', () => {
//         req = { body: { _uid: 'wgthyjui34567vt' } }
//         res = {
//             render: sinon.spy()
//         }
//         it('should render home page after remove operation', async () => {
//             // Stub the relevant functions
//             sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
//             await removedBook(req, res)
//             expect(res.render.calledOnce).to.be.true;

//         })

//         it('should give error if request is improper', async () => {
//             req = {}
//             res = {
//                 render: sinon.spy(),
//                 send: sinon.spy()
//             }
            
//             sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
//             let x = await removedBook(req, res)
//             console.log(x)
//             expect(res.send.calledOnce).to.be.true;
//         })
//     });

// });




