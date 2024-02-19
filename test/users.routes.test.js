// const chai = require('chai');
// const sinon = require('sinon');
// const chaiHttp = require('chai-http');
// const app = require('../app'); // Replace with the actual path to your Express app file
// const expect = chai.expect;
// const cont=require('../controllers/users')

// chai.use(chaiHttp);

// describe('User Routes', () => {
//     afterEach(() => {
//         sinon.restore();
//     });

//     it('should render login page on GET /loginpage', async () => {
//         const res = await chai.request(app).get('/loginpage');
//         expect(res).to.have.status(200);
//         // expect(res.text).to.contain('Login Page'); // Replace with the expected content on the login page
//     });

//     it('should render signup page on GET /signuppage', async () => {
//         const res = await chai.request(app).get('/signuppage');
//         expect(res).to.have.status(200);
//         // expect(res.text).to.contain('Signup Page'); // Replace with the expected content on the signup page
//     });

//     it('should get user orders on GET /orders', async () => {
//         const userId = 'testUserId';
//         const ordersStub = sinon.stub(cont);
//         const mockData={data:books}
//         // Assume the controller returns orders for the user
//         ordersStub.withArgs(userId).returns(mockData);

//         // Stub the controller in your route
//         sinon.stub(cont, 'myOrders').callsFake((req, res) => {
//             res.status(200).send(ordersStub(req.headers['user-id']));
//         });

//         const res = await chai.request(app).get('/orders').set('user-id', userId);
//         expect(res).to.have.status(200);
//         // Add more assertions based on your application's behavior
//     });

//     // it('should get user orders on GET /orders', async () => {
//     //     // Mock user authentication if required for testing orders
//     //     // e.g., use a test user ID to simulate an authenticated user
//     //     const userId = 'testUserId';
//     //     const res = await chai.request(app).get('/orders').set('user-id', userId);
//     //     expect(res).to.have.status(200);
//     //     // Add more assertions based on your application's behavior
//     // });

//     it('should render user adds page on GET /myadds', async () => {
//         // Mock user authentication if required for testing adds
//         const userId = 'testUserId';
//         const res = await chai.request(app).get('/myadds').set('user-id', userId);
//         expect(res).to.have.status(200);
//         // Add more assertions based on your application's behavior
//     });

//     it('should get user book requests on GET /requests', async () => {
//         // Mock user authentication if required for testing book requests
//         const userId = 'testUserId';
//         const res = await chai.request(app).get('/requests').set('user-id', userId);
//         expect(res).to.have.status(200);
//         // Add more assertions based on your application's behavior
//     });
// });
