// // const chai = require('chai');
// // const chaiHttp = require('chai-http');
// // const multer = require('multer');
// // const sinon = require('sinon');
// // const path = require('path');

// // const { expect } = chai;
// // const upload = require('../middleware/storage_upload');

// // chai.use(chaiHttp);

// // describe('multer middleware', () => {
// //     it('should set destination and filename using sinon.stub', () => {
// //         const cbStub = sinon.stub();
// //         const diskStorageStub = sinon.stub(multer, 'diskStorage').returns({
// //             destination: cbStub.withArgs(null, path.resolve(`./public/uploads/`)),
// //             filename: cbStub.withArgs(null, `${Date.now()}-testfile.txt`),
// //         });


// //         // Simulate a file upload
// //         const req = {};
// //         const res = {};
// //         upload.array('files')(req, res, () => {});

// //         sinon.assert.calledOnce(diskStorageStub);
// //         sinon.assert.calledOnce(cbStub.withArgs(null, path.resolve(`./public/uploads/`)));
// //         sinon.assert.calledOnce(cbStub.withArgs(null, `${Date.now()}-testfile.txt`));

// //         // Restore the original behavior to avoid affecting other tests
// //         diskStorageStub.restore();
// //     });

// //     it('should handle file uploads using sinon.stub', () => {
// //         const storageStub = {
// //             destination: sinon.stub(),
// //             filename: sinon.stub(),
// //         };

// //         const multerStub = sinon.stub(multer, 'diskStorage').returns(storageStub);

// //         // const upload = require('./path/to/multer-middleware');

// //         // Simulate a file upload
// //         const req = {};
// //         const res = {};
// //         upload.array('files')(req, res, () => {});

// //         sinon.assert.calledOnce(storageStub.destination);
// //         sinon.assert.calledOnce(storageStub.filename);

// //         // Restore the original behavior to avoid affecting other tests
// //         multerStub.restore();
// //     });
// // });



// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const multer = require('multer');
// const sinon = require('sinon');
// const path = require('path');
// const upload = require('../middleware/storage_upload');
// const { expect } = chai;

// chai.use(chaiHttp);

// describe('multer middleware', () => {
//     afterEach(() => {
//         sinon.restore();
//     });

//     it('should set destination and filename using sinon.stub', () => {
//         const cbStub = sinon.stub();
//         const diskStorageStub = sinon.stub(multer, 'diskStorage').returns({
//             destination: cbStub.withArgs(sinon.match.any, path.resolve(`./public/uploads/`)),
//             filename: cbStub.withArgs(sinon.match.any, `${Date.now()}-testfile.txt`),
//         });
//         const req = {
//             headers: {
//                 'content-type': 'multipart/form-data', // Ensure that 'content-type' is set to 'multipart/form-data'
//             },
//         };

//         // Simulate a file upload
//         // const req = {};
//         const res = {};
//         upload.single('files')(req, res, () => { });

//         sinon.assert.calledOnce(diskStorageStub);
//         // sinon.assert.calledOnce(cbStub.withArgs(sinon.match.any, path.resolve(`./public/uploads/`)));
//         // sinon.assert.calledOnce(cbStub.withArgs(sinon.match.any, `${Date.now()}-testfile.txt`));

//         // Restore the original behavior to avoid affecting other tests
//         diskStorageStub.restore();
//     });

//     it('should handle file uploads using sinon.stub', () => {
//         const storageStub = {
//             destination: sinon.stub(),
//             filename: sinon.stub(),
//         };

//         const multerStub = sinon.stub(multer, 'diskStorage').returns(storageStub);
//         const req = {
//             headers: {
//                 'content-type': 'multipart/form-data', // Ensure that 'content-type' is set to 'multipart/form-data'
//             },
//         };

//         // Simulate a file upload
//         // const req = {};
//         const res = {};
//         upload.single('files')(req, res, () => { });

//         sinon.assert.calledOnce(storageStub.destination);
//         sinon.assert.calledOnce(storageStub.filename);

//         // Restore the original behavior to avoid affecting other tests
//         multerStub.restore();
//     });
// });

