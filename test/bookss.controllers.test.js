const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const sinon = require('sinon');
const { reqBook, delBook,adBook,revBook } = require('../controllers/bookss');
const User = require('../model/usersModel');
const bookModel = require('../model/itemsModel');
const nodemailer = require('nodemailer');
const s3functions = require('../middleware/uploads3');


describe('reqBook Function', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('should handle successful book request', async () => {
        // Mock User and bookModel methods
        sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
        sinon.stub(User, 'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
        sinon.stub(bookModel, 'find').resolves([{ title: 'Test Book' }]);
        sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sinon.stub().yields(null, { response: 'success' })
        });
        // Stub the response object
        const res = { json: sinon.spy() };

        // Test input
        const req = {
            body: {
                _uid: new mongoose.Types.ObjectId(),
                _bid: new mongoose.Types.ObjectId(),
                _oid: new mongoose.Types.ObjectId(),
            },
        };

        // Execute the function
        await reqBook(req, res);

        // Assert the expectations
        expect(res.json.calledOnce, 'res.json should be called once').to.be.true;
        expect(res.json.calledWithExactly({ val: 'Book is requested' }), 'res.json should be called with the correct arguments').to.be.true;
    });


    it('should handle failed book request', async () => {
        // Mock User and bookModel methods
        sinon.stub(User, 'updateOne').resolves({ modifiedCount: 0 });
        sinon.stub(User, 'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
        sinon.stub(bookModel, 'find').resolves([{ title: 'Test Book' }]);
        // sinon.stub(sendMail, 'sendMail').resolves({ response: 'success' });
        sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sinon.stub().yields(null, { response: 'success' })
        });
        // Stub the response object
        const res = { json: sinon.spy() };

        // Test input
        const req = {
            body: {
                _uid: new mongoose.Types.ObjectId(),
                _bid: new mongoose.Types.ObjectId(),
                _oid: new mongoose.Types.ObjectId(),
            },
        };

        // Execute the function
        await reqBook(req, res);

        // Assert the expectations
        expect(res.json.calledOnce, 'res.json should be called once').to.be.true;
        expect(res.json.calledWithExactly({ val: 'Requesting book is failed' }), 'res.json should be called with the correct arguments').to.be.true;
    });

});


describe('delBook Function', () => {
    afterEach(() => {
        sinon.restore();
    });
    beforeEach(() => {
        const req = {
            body: {
                _uid: new mongoose.Types.ObjectId(),
                _bid: new mongoose.Types.ObjectId(),
                _oid: new mongoose.Types.ObjectId(),
            }
        }
    })
    it('should handle successful book request', async () => {

        const res = {
            json: sinon.spy()
        }

        sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
        sinon.stub(User, 'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
        sinon.stub(bookModel, 'findOne').resolves([{ title: 'Test Book' }]);
        sinon.stub(bookModel, 'findOneAndUpdate').resolves({ deletedCount: 1 });
        sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sinon.stub().yields(null, { response: 'success' })
        });
        await delBook(req, res)

        expect(res.json.calledOnce, 'res.json should be called once').to.be.true;
        expect(res.json.calledWithExactly({ val: 'Document deleted successfully' }), 'res.json should be called with the correct arguments')
    })

    it('should handle failed book request', async () => {
        const res = {
            json: sinon.spy()
        }

        sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
        sinon.stub(User, 'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
        sinon.stub(bookModel, 'findOne').resolves([{ title: 'Test Book' }]);
        sinon.stub(bookModel, 'findOneAndUpdate').resolves({ deletedCount: 1 });
        sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sinon.stub().yields(null, { response: 'success' })
        });
        await delBook(req, res)

        expect(res.json.calledOnce, 'res.json should be called once').to.be.true;
        expect(res.json.calledWithExactly({ val: 'Document deleted successfully' }), 'res.json should be called with the correct arguments')
    })

    it('should handle failing book request', async () => {
        const res = {
            json: sinon.spy()
        }

        sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
        sinon.stub(User, 'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
        sinon.stub(bookModel, 'findOne').resolves([{ title: 'Test Book' }]);
        sinon.stub(bookModel, 'findOneAndUpdate').returns({ deletedCount: 0 });
        sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sinon.stub().yields(null, { response: 'success' })
        });
        await delBook(req, res)

        expect(res.json.calledOnce, 'res.json should be called once').to.be.true;
        expect(res.json.calledWithExactly({ error: 'An error occurred while deleting the book' }), 'res.json should be called with the correct arguments')
    })

    it('should handle failing book request', async () => {
        const res = {
            json: sinon.spy(),
            status: sinon.stub().returnsThis()
        }

        sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
        sinon.stub(User, 'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
        sinon.stub(bookModel, 'findOne').resolves([{ title: 'Test Book' }]);
        sinon.stub(bookModel, 'findOneAndUpdate').returns(null);
        sinon.stub(nodemailer, 'createTransport').returns({
            sendMail: sinon.stub().yields(null, { response: 'success' })
        });
        await delBook(req, res)

        expect(res.json.calledOnce, 'res.json should be called once').to.be.true;
        // expect(res.json.calledWithExactly({ error: 'Book not found' }), 'res.json should be called with the correct arguments')
    })

})
describe('adBook Function', () => {
    afterEach(() => {
      sinon.restore();
    });
    let mockedBooks ;
    beforeEach(() => {
        // Sample data with all required fields
        mockedBooks =
            {
              _id: 'book1',
              title: 'The Lord of the Rings',
              availability: true,
              pageCount: 1138,
              publishedDate: new Date('1954-09-21'),
              thumbnailUrl: 'https://example.com/lord-of-the-rings.jpg',
              shortDescription: 'A hobbit named Frodo inherits the One Ring, which threatens to destroy Middle-earth. He embarks on a quest to destroy the Ring in the fires of Mount Doom.',
              longDescription: '...', // Add longer description here
              status: 'PUBLISH',
              authors: ['J.R.R. Tolkien'],
              categories: ['Fantasy', 'Adventure'],
              img: 'https://example.com/lord-of-the-rings-image.jpg',
              owner: 'user123', // Replace with valid user ID
            };
    });
  
    it('should handle successful book add', async () => {
      
      // Stub the uploadFileToS3 function
      sinon.stub(s3functions, 'uploadFileToS3').resolves({
        url: 'https://s3.amazonaws.com/bucket-name/test.jpg',
      });
  
      // Stub the save method of the model's prototype
      sinon.stub(bookModel.prototype, 'save').resolves({
        _id: 'some-mocked-id',
        img: { data: 'jrnfefndo', contentType: 'jhebfjkw' },
      });
      sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
      sinon.stub(User, 'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
      sinon.stub(bookModel, 'findOne').resolves([{ title: 'Test Book', img: 'https://s3.amazonaws.com/bucket-name/test.jpg' }]);
      sinon.stub(nodemailer, 'createTransport').returns({
        sendMail: sinon.stub().yields(null, { response: 'success' }),
      });
  
      const req = {
        body: mockedBooks,
        file: {
          buffer: 'mocked-buffer',
          mimetype: 'image/jpeg',
        },
      };
  
      // Stub response object
      let res = { json: sinon.spy(), status: sinon.stub().returnsThis() };
  
      await adBook(req, res);
  
      // Assert the expectations
      expect(res.json.calledOnce, 'res.json should be called once').to.be.true;
      expect(res.json.calledWithExactly({ val: true })).to.be.true;
  
    });

    it('should handle failure book add', async () => {
      
        // Stub the uploadFileToS3 function
        sinon.stub(s3functions, 'uploadFileToS3').resolves({
          url: 'https://s3.amazonaws.com/bucket-name/test.jpg',
        });
    
        // Stub the save method of the model's prototype
        sinon.stub(bookModel.prototype, 'save').resolves({
          _id: 'some-mocked-id',
          img: { data: 'jrnfefndo', contentType: 'jhebfjkw' },
        });
        sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
        sinon.stub(User, 'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
        sinon.stub(bookModel, 'findOne').yields(new Error("Internal Server Error"));
        sinon.stub(nodemailer, 'createTransport').returns({
          sendMail: sinon.stub().yields(null, { response: 'success' }),
        });
    
        const req = {
          body: mockedBooks,
          file: {
            buffer: 'mocked-buffer',
            mimetype: 'image/jpeg',
          },
        };
    
        // Stub response object
        let res = { json: sinon.spy(), status: sinon.stub().returnsThis() };
    
        await adBook(req, res);
    
        // Assert the expectations
        expect(res.json.calledOnce, 'res.json should be called once').to.be.true;
        expect(res.json.calledWithExactly({ val: false,error:"Internal Server Error" })).to.be.true;
    
      });
      it('should handle failure book add', async () => {
      
        // Stub the uploadFileToS3 function
        sinon.stub(s3functions, 'uploadFileToS3').resolves({
          url: 'https://s3.amazonaws.com/bucket-name/test.jpg',
        });
    
        // Stub the save method of the model's prototype
        sinon.stub(bookModel.prototype, 'save').resolves({
          _id: 'some-mocked-id',
          img: { data: 'jrnfefndo', contentType: 'jhebfjkw' },
        });
        sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
        sinon.stub(User, 'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
        const error= new Error("ValidationError");
        error.name='ValidationError';
        sinon.stub(bookModel, 'findOne').yields(error);
        sinon.stub(nodemailer, 'createTransport').returns({
          sendMail: sinon.stub().yields(null, { response: 'success' }),
        });
    
        const req = {
          body: mockedBooks,
          file: {
            buffer: 'mocked-buffer',
            mimetype: 'image/jpeg',
          },
        };
    
        // Stub response object
        let res = { json: sinon.spy(), status: sinon.stub().returnsThis() };
    
        await adBook(req, res);
    
        // Assert the expectations
        expect(res.json.calledOnce, 'res.json should be called once').to.be.true;
        expect(res.json.calledWithExactly({ val: false,error:"Internal Server Error" })).to.be.true;
    
      });
  });

  describe('revokeBook function', () => {
       afterEach(() => {
        sinon.restore();
       })
       beforeEach(() => {
        const req = {
            body: {
                _bid: new mongoose.Types.ObjectId(),
                }
        }
    })
        it('should handle successful revoke', async () => {
            sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
            sinon.stub(User,'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
            sinon.stub(bookModel, 'findOne').resolves([{ title: 'Test Book', img: 'https://s3.amazonaws.com/bucket-name/test.jpg',owner:"xrctyvnu34567890" }]);
            sinon.stub(bookModel, 'findOneAndUpdate').resolves({ modified:true });
            sinon.stub(nodemailer, 'createTransport').returns({
                sendMail: sinon.stub().yields(null, { response: 'success' }),
            });
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };
            await revBook(req, res);
            expect(res.json.calledOnce, 'json should be called once').to.be.true;
            expect(res.json.calledWithExactly({ val: 'Document reverted successfully' })).to.be.true;
        })

        it('should handle failure revoke', async () => {
            sinon.stub(User, 'updateOne').resolves({ modifiedCount: 1 });
            sinon.stub(User,'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
            sinon.stub(bookModel, 'findOne').resolves([{ title: 'Test Book', img: 'https://s3.amazonaws.com/bucket-name/test.jpg',owner:"xrctyvnu34567890" }]);
            sinon.stub(bookModel, 'findOneAndUpdate').resolves(null);
            sinon.stub(nodemailer, 'createTransport').returns({
                sendMail: sinon.stub().yields(null, { response: 'success' }),
            });
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };
            await revBook(req, res);
            expect(res.json.calledOnce, 'json should be called once').to.be.true;
            expect(res.json.calledWithExactly({ val: 'Document not found or not revoked' })).to.be.true;
        })
        it('should handle failing revoke', async () => {
            sinon.stub(User, 'updateOne').yields(new Error("Internal Server Error"));
            sinon.stub(User,'find').resolves([{ email: 'user-email@example.com', name: 'User' }]);
            sinon.stub(bookModel, 'findOne').resolves([{ title: 'Test Book', img: 'https://s3.amazonaws.com/bucket-name/test.jpg',owner:"xrctyvnu34567890" }]);
            sinon.stub(bookModel, 'findOneAndUpdate').resolves({ modified:true });
            sinon.stub(nodemailer, 'createTransport').returns({
                sendMail: sinon.stub().yields(null, { response: 'success' }),
            });
            const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };
            await revBook(req, res);
            expect(res.json.calledOnce, 'json should be called once').to.be.true;
            expect(res.json.calledWithExactly({ error: 'Internal server error' })).to.be.true;
        })
       
  })
  
