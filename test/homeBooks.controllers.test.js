const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const supertest = require('supertest');
const jwt = require('jsonwebtoken');

const bookModel = require('../model/itemsModel')
const mongoose = require('mongodb');
const app = require('../app');
const request = supertest(app);

describe('Home Books', () => {
    afterEach(() => {
        sinon.restore();
    });

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


// describe('Book Find', () => {
//     afterEach(() => {
//         sinon.restore();
//     });
//     it('should render home page with auth cookie and search', () => {

//         //Stub the functions
//         sinon.stub(jwt, 'verify').returns({ user: { id: "123456789012345678901234" } });
//         sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", availability: true, owner: "1234567890", _id: "1234567890" }]);
//         sinon.stub(mongoose, 'ObjectId').returns("1234567890");
//         // Set up the stub to match the actual arguments
//         const aggregateStub = sinon.stub(bookModel, 'aggregate');

//         aggregateStub.withArgs([{
//             $search: { index: "searchingIndex", text: { query: 'test', path: { wildcard: "*" } } }
//         }]).resolves([{ name: "test", author: "test", availability: true, owner: "1234567890", _id: "1234567890" }]);

//         // sinon.stub(bookModel,'aggregate').resolves([{name:"test",author:"test",availability:true,owner:"1234567890",_id:"1234567890"}]);

//         //Call the function
//         let res = request
//             .post('/userauth/home/find')
//             .set('Cookie', ['authtoken=test-token'])
//             .set('body', { search: 'test' })
//             .end((error, res) => {
//                 expect(res.status).to.equal(200);
//                 expect(res.text).to.include('<title>Home</title>');
//             })
//         //Assert

//     })
//     it('should render home page with auth cookie and null search', () => {

//         //Stub the functions
//         sinon.stub(jwt, 'verify').returns({ user: { id: "123456789012345678901234" } });
//         sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
//         sinon.stub(mongoose, 'ObjectId').returns("1234567890");

//         //Call the function
//         let res = request
//             .post('/userauth/home/find')
//             .set('Cookie', ['authtoken=test-token'])
//             .send('body', { search: '' })

//             .end((error, res) => {
//                 //Assert
//                 expect(res.status).to.equal(200);
//                 expect(res.text).to.include('<title>Home</title>');
//             })
//     })
//     it('should render home page without auth cookie and null search', () => {

//         //Stub the functions
//         sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);

//         //Call the function
//         let res = request
//             .post('/userauth/home/find')
//             // .set('Cookie', ['authtoken=test-token'])
//             .set('body', { search: '' })

//             .end((error, res) => {
//                 //Assert
//                 expect(res.status).to.equal(200);
//                 expect(res.text).to.include('<title>Home</title>');
//             })
//     })
//     it('should render home page without auth cookie and search', () => {

//         //Stub the functions
//         sinon.stub(bookModel,'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);
//         // sinon.stub(bookModel,'aggregate').returns([{name:"test",author:"test",price:100,availability:true,owner:"1234567890",_id:"1234567890"}]);
//         const aggregateStub = sinon.stub(bookModel, 'aggregate');

//         // Set up the stub to match the actual arguments
//         aggregateStub.withArgs([{
//             $search: { index: "searchingIndex", text: { query: 'test', path: { wildcard: "*" } } }
//         }]).resolves([{ name: "test", author: "test", availability: true, owner: "1234567890", _id: "1234567890" }]);

//         //Call the function
//         let res = request
//             .post('/userauth/home/find')
//             // .set('Cookie', ['authtoken=test-token'])
//             .set('body', { search: 'test' })

//             .end((error, res) => {
//                 //Assert
//                 expect(res.status).to.equal(200);
//                 expect(res.text).to.include('<title>Home</title>');
//             })
//     })
//     it('should render home page with auth cookie but with error', () => {

//         //Stub the functions
//         sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));


//         //Call the function
//         let res = request
//             .post('/userauth/home/find')
//             .set('Cookie', ['authtoken=test-token'])
//             .set('body', { search: 'test' })

//             .end((error, res) => {
//                 //Assert
//                 expect(res.status).to.equal(401);
//                 expect(res.text).to.include('Invalid token.');
//             })
//     });
//     it('should render home page with auth cookie but with error', () => {

//         //Stub the functions
//         sinon.stub(jwt, 'verify').throws(new Error('Invalid token'));

//         //Call the function
//         let res = request
//             .post('/userauth/home/find')
//             .set('Cookie', ['authtoken=test-token'])
//             .set('body', { search: '' })
//             .end((error, res) => {
//                 //Assert
//                 expect(res.status).to.equal(401);
//                 expect(res.text).to.include('Invalid token.');
//             });
//     })
// })


// describe('Remove books', () => {
//     afterEach((done) => {
//         sinon.restore();
//         done();
//     });

//     it('rendering books after remove operation', (done) => {
        // Stub the relevant functions
        // sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", availability: true, owner: "1234567890", _id: "1234567890" }]);

        // // Use supertest to simulate a POST request to your route
        //  request
        //     .post('/userauth/home/removed')
        //     .send('body',{ _uid: 'wgthyjui34567vt' })
        //     .end((err,res)=>{
        //         // Assert the response and stubbed functions
        //         expect(res.status).to.equal(200);
        //         // expect(res.text).to.include('<title>Home</title>');
        //     })
    //     sinon.stub(bookModel,'find').resolves([{ name: "test", author: "test", availability: true, owner: "1234567890", _id: "1234567890" }]);

    //     // Use supertest to simulate a POST request to your route
    //     request
    //     .post('/userauth/home/removed')
    //     .send('body',{ _uid: 'wgthyjui34567vt' })
    //     .expect(200)
    //     .end((err, res) => {
    //         if (err) {
    //             done(err);
    //         } else {
    //             // Add more assertions based on your expectations
    //             // e.g., expect(res.text).to.include('<title>Home</title>');

    //             // End the test
    //             done();
    //         }
    //     });
        
    // });

    // it('rendering books after remove operation in catch', async() => {
    //     sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", price: 100, availability: true, owner: "1234567890", _id: "1234567890" }]);

    //     // Use supertest to simulate a POST request to your route
    //     let res = await request
    //         .post('/home/removed')
    //         .set('body',{ _uid: 'wgthyjui34567vt' })

    //     // Assert the response and stubbed functions
    //     // expect(res.status).to.equal(404);
    //     // expect(res.text).to.include('<title>Home</title>');
    // })
// });

describe('removedBook', () => {
    it('should render home page after remove operation', async () => {
        // Stub the relevant functions
        sinon.stub(bookModel, 'find').resolves([{ name: "test", author: "test", availability: true, owner: "1234567890", _id: "1234567890" }]);
        
        // Use supertest to simulate a POST request to your route
        const res = await request
            .post('/userauth/home/removed') // Replace with your actual route
            .send({ _uid: 'wgthyjui34567vt' });

        // Assert the response and stubbed functions
        expect(res.status).to.equal(200);
        // Add more assertions based on your expectations
        // e.g., expect(res.text).to.include('<title>Home</title>');

        // Restore the stubs
        sinon.restore();
    });

    it('should handle errors and log them', async () => {
        // Stub the relevant functions to simulate an error
        sinon.stub(bookModel, 'find').resolves();

        // Use supertest to simulate a POST request to your route
        const res = await request
            .post('/userauth/home/removed') // Replace with your actual route
            .send({ _uid: 'wgthyjui34567vt' });

        // Assert the response and stubbed functions
        expect(res.status).to.equal(500); // Adjust status code based on your error handling

        // Restore the stubs
        sinon.restore();
    });
});