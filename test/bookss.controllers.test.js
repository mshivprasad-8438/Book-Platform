// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const sinon = require('sinon');
// const cont = require('../controllers/bookss'); // Replace with the correct path
// const { ObjectId } = require('mongoose').Types;
// const bookModel = require('../model/itemsModel')
// chai.use(chaiHttp);
// const expect = chai.expect;

// describe('addBook function', () => {


//     let data = {
//         title: 'Mock Book',
//         owner: new ObjectId(), // Use new ObjectId() to generate a new ObjectId
//         availability: true,
//         pageCount: 20,
//         publishedDate: new Date("2024-02-08T07:41:50.344Z"),
//         thumbnailUrl: "www.photo.jpeg",
//         shortDescription: "gfencd vjokvn orjfcm kvme",
//         longDescription: "gfencd vjokvn orjfcm kvme",
//         status: "Draft",
//         authors: ["abdul", "kalam"],
//         categories: ["fiction", "biography"],
//         img: "www. images.dot.jpeg",
//         // ... other required properties
//     };
//     let dt={
//         title: 'Mock Book',
//         owner: new ObjectId(), // Use new ObjectId() to generate a new ObjectId
//         availability: true,
//         pageCount: 20,
//     }

//     it('should add a book and send an email on successful upload', () => {
//         const mockReq = {
//             file: {
//                 buffer: Buffer.from('mockImageBuffer'),
//                 mimetype: 'image/jpeg',
//             },
//             body: data,
//         };

//         chai.request(cont.adBook)
//             .post('/bookss/addbook')
//             .send(mockReq)
//             .end((err, res) => {
//                 expect(res).to.have.status(200);
//                 expect(res.body).to.have.property('val').to.equal(true);

//             });
//     }).timeout(10000);;

//     it('should handle errors and return a 500 status', () => {
//         // Create a scenario where the book save fails

//         const mockReq = {
//             file: {
//                 buffer: Buffer.from('mockImageBuffer'),
//                 mimetype: 'image/jpeg',
//             },
//             body: dt,
//         };

//         // Stub the save method of your model to simulate a failure
//         // const saveStub = sinon.stub(bookModel.prototype, 'save');
//         // saveStub.rejects(new Error('Mock error'));

//         chai.request(cont.adBook)
//             .post('/bookss/addbook')
//             .send(mockReq)
//             .end((err, res) => {
//                 expect(res).to.have.status(500);
//                 expect(res.body).to.have.property('val').to.equal(true);
//                 expect(res.body).to.have.property('error').to.equal('Internal Server Error');

//                 // saveStub.restore();

//                 // done();
//             });
//     }).timeout(10000);;
// });

// describe("delBook function", () => {
//     let data = { _bid: new ObjectId() };
//     it("Removing the book from entry ", () => {
//         const mockReq = {
//             body: data,
//         }
//         chai.request(cont.delBook)
//             .post('/bookss/delBook')
//             .send(mockReq)
//             .end((err, res) => {
//                 expect(res).to.have.property('val').to.equal('Document deleted successfully')
//             })
//     });
//     it("Removing book failes", () => {
//         const mockReq = {
//             body: data,
//         }
//         chai.request(cont.delBook)
//             .post('/bookss/delBook')
//             .send(mockReq)
//             .end((err, res) => {
//                 expect(res).to.have.property('val').to.equal('Document not found or not deleted')
//             })
//     });
// });

// describe("Requesting a book", () => {
//     let data = {
//         _bid: new ObjectId(),
//         _oid: new ObjectId(),
//         _uid: new ObjectId()
//     }
//     it('Successful requesting', () => {
//         const mockReq = {
//             body: data,
//         }
//         chai.request(cont.reqBook)
//         .post('/bookss/reqBook')
//         .send(mockReq)
//         .end((err,res)=>{
//             expect(res).to.have.property('val').to.equal('Book is requested')
//         })
//     })
//     it('Failure requesting', () => {
//         const mockReq = {
//             body: data,
//         }
//         chai.request(cont.reqBook)
//         .post('/bookss/reqBook')
//         .send(mockReq)
//         .end((err,res)=>{
//             expect(res).to.have.property('val').to.equal('Requesting book is failed')
//         })
//     })
// })

