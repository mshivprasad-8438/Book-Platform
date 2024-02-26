// const chai = require('chai');
// const sinon = require('sinon');
// const { expect } = chai;

// const { signUp, logIn, logOut } = require('../controllers/userAuth');
// const User = require('../model/usersModel');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// describe('userAuth controller', () => {

//     describe('signUp', () => {
//         it('should successfully create a new user', async () => {
//             sinon.stub(bcrypt, 'genSalt').resolves(10);
//             sinon.stub(bcrypt, 'hash').resolves('hashedPassword');
//             sinon.stub(User, 'create').resolves({
//                 id: '123',
//                 name: 'Test User',
//                 email: 'test@example.com'
//             });

//             const req = {
//                 body: {
//                     name: 'Test User',
//                     email: 'test@example.com',
//                     password: 'password123'
//                 }
//             };

//             const res = {
//                 json: sinon.spy(),
//                 cookie: sinon.spy()
//             };

//             await signUp(req, res);

//             expect(res.json.calledOnce).to.be.true;
//             expect(res.json.args[0][0]).to.have.property('success', true);
//             expect(res.cookie.calledOnce).to.be.true;
//         });

//     //     it('should handle validation errors', async () => {
//     //         const errors = [{ msg: 'Invalid name' }];
//     //         const req = {
//     //             body: {
//     //                 name: 'ab'
//     //             }
//     //         };
//     //         const res = {
//     //             json: sinon.spy()
//     //         };

//     //         await signUp(req, res);

//     //         expect(res.json.calledOnce).to.be.true;
//     //         expect(res.json.args[0][0]).to.have.property('errors', errors);
//     //     });

//     // });

//     // describe('logIn', () => {
//     //     it('should login existing user', async () => {
//     //         sinon.stub(User, 'findOne').resolves({
//     //             id: '123',
//     //             password: 'hashedPassword'
//     //         });
//     //         sinon.stub(bcrypt, 'compare').resolves(true);
//     //         sinon.stub(jwt, 'sign').returns('token123');

//     //         const req = {
//     //             body: {
//     //                 email: 'test@example.com',
//     //                 password: 'password123'
//     //             }
//     //         };

//     //         const res = {
//     //             cookie: sinon.spy(),
//     //             redirect: sinon.spy()
//     //         };

//     //         await logIn(req, res);

//     //         expect(res.cookie.calledOnce).to.be.true;
//     //         expect(res.redirect.calledOnce).to.be.true;
//     //     });

//     //     it('should return error for invalid credentials', async () => {
//     //         sinon.stub(User, 'findOne').resolves(null);

//     //         const req = {
//     //             body: {
//     //                 email: 'test@example.com',
//     //                 password: 'password123'
//     //             }
//     //         };

//     //         const res = {
//     //             status: sinon.stub().returnsThis(),
//     //             json: sinon.spy()
//     //         };

//     //         await logIn(req, res);

//     //         expect(res.status.calledOnce).to.be.true;
//     //         expect(res.json.calledOnce).to.be.true;
//     //         expect(res.json.args[0][0]).to.have.property('error');
//     //     });
//     // });

//     // describe('logOut', () => {
//     //     it('should clear auth cookie and redirect', async () => {
//     //         const req = {
//     //             user: {
//     //                 id: '123'
//     //             }
//     //         };

//     //         const res = {
//     //             clearCookie: sinon.spy(),
//     //             redirect: sinon.spy()
//     //         };

//     //         await logOut(req, res);

//     //         expect(res.clearCookie.calledOnce).to.be.true;
//     //         expect(res.redirect.calledOnce).to.be.true;
//     //     });
//     });

// });
