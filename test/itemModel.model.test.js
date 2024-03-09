const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;
 
var Book = require('../model/itemsModel');

describe('Testing book model', () => {
    let sampleBookVal;
    beforeEach(() => {
        sampleBookVal = {
            title: 'Sample Book Title',
            availability: true,
            pageCount: 200,
            publishedDate: new Date(),
            thumbnailUrl: 'sample-thumbnail-url.jpg',
            shortDescription: 'Sample short description',
            longDescription: 'Sample long description',
            status: 'PUBLISH',
            authors: ['Author 1', 'Author 2'],
            categories: ['Category 1', 'Category 2'],
            img: 'sample-image.jpg',
            owner: "mongoose.Types.ObjectId()", // replace with a valid ObjectId
        };
    });

    it('it should create the book successfully with correct parameters', () => {
        let book = new Book(sampleBookVal);
        try {
            book.validate();
            expect(book.title).to.equal(sampleBookVal.title);
            // Add more assertions as needed
        } catch (err) {
            throw new Error('⚠️ Unexpected failure!');
        }
    }).timeout(3000);

    it('it should throw an error due to missing fields', async () => {
        delete sampleBookVal['title'];
        let book = new Book(sampleBookVal);
        try {
            await book.validate();
            // Validation succeeded, which is unexpected
            // Fail the test as there should have been validation errors
            throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
            // Validation failed, as expected
            expect(err).to.exist;
        }
    });

    it('it should throw an error due to no fields sent', async () => {
        let book = new Book();
        try {
            await book.validate();
            // Validation succeeded, which is unexpected
            // Fail the test as there should have been validation errors
            throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
            // Validation failed, as expected
            expect(err).to.exist;
        }
    });
});
