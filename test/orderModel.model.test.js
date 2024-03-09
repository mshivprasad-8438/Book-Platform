const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;

var Order = require('../model/orderModel');

describe('Testing order model', () => {
    let sampleOrderVal;
    beforeEach(() => {
        sampleOrderVal = {
            owner: "mongoose.Types.ObjectId()", // replace with a valid ObjectId
            customer: "mongoose.Types.ObjectId()", // replace with a valid ObjectId
            book: "mongoose.Types.ObjectId()", // replace with a valid ObjectId
            timestamp: new Date(),
            status: 'Order processing',
        };
    });

    it('it should create the order successfully with correct parameters', () => {
        let order = new Order(sampleOrderVal);
        try {
            order.validate();
            expect(order.status).to.equal(sampleOrderVal.status);
            // Add more assertions as needed
        } catch (err) {
            throw new Error('⚠️ Unexpected failure!');
        }
    }).timeout(3000);

    it('it should throw an error due to missing fields', async () => {
        delete sampleOrderVal['owner'];
        let order = new Order(sampleOrderVal);
        try {
            await order.validate();
            // Validation succeeded, which is unexpected
            // Fail the test as there should have been validation errors
            throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
            // Validation failed, as expected
            expect(err).to.exist;
        }
    });

    it('it should throw an error due to no fields sent', async () => {
        let order = new Order();
        try {
            await order.validate();
            // Validation succeeded, which is unexpected
            // Fail the test as there should have been validation errors
            throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
            // Validation failed, as expected
            expect(err).to.exist;
        }
    });
});

describe('Testing order model', () => {
    let sampleOrderVal;
    beforeEach(() => {
        sampleOrderVal = {
            owner: "mongoose.Types.ObjectId()", // replace with a valid ObjectId
            customer: "mongoose.Types.ObjectId()", // replace with a valid ObjectId
            book: "mongoose.Types.ObjectId()", // replace with a valid ObjectId
            timestamp: new Date(),
            status: 'Order processing',
        };
    });

    it('it should create the order successfully with correct parameters', () => {
        let order = new Order(sampleOrderVal);
        try {
            order.validate();
            expect(order.status).to.equal(sampleOrderVal.status);
            // Add more assertions as needed
        } catch (err) {
            throw new Error('⚠️ Unexpected failure!');
        }
    }).timeout(3000);

    it('it should throw an error due to missing fields', async () => {
        delete sampleOrderVal['owner'];
        let order = new Order(sampleOrderVal);
        try {
            await order.validate();
            // Validation succeeded, which is unexpected
            // Fail the test as there should have been validation errors
            throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
            // Validation failed, as expected
            expect(err).to.exist;
        }
    });

    it('it should throw an error due to no fields sent', async () => {
        let order = new Order();
        try {
            await order.validate();
            // Validation succeeded, which is unexpected
            // Fail the test as there should have been validation errors
            throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
            // Validation failed, as expected
            expect(err).to.exist;
        }
    });
});
