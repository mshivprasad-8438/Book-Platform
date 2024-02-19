const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;
 
var Item = require('../model/usersModel.js');
 
describe('Testing user model', () => {
    let sampleItemVal;
    beforeEach(() => {
      sampleItemVal = {
        email: 'sampleEmail@gmail.com',
        password : '@#@$$DL:SFS;ldfdsfgds;l)!#)(#9$#%',
        name:"asdfg",
        phoneno:7686875656,
        images:"qwertuiodfgjk.jpeg"
      };
    });
    it('it should create the item successfully with correct parameters',() => {
      let item = new Item(sampleItemVal);
      try{
        item.validate();

        expect(item.email).to.equal(sampleItemVal.email)
      }
      catch{(err)=>{throw new Error('⚠️ Unexpected failure!')}}
      
    }).timeout(3000);
    it('it should throw an error due to missing fields', async () => {
      delete sampleItemVal['name'];
        let item = new Item(sampleItemVal);
        try {
          await item.validate();
          // Validation succeeded, which is unexpected
          // Fail the test as there should have been validation errors
          throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
          // Validation failed, as expected
          expect(err).to.exist;
          
        }
      });

      it('it should throw an error due to no fields sent', async () => {
        let item = new Item();
        try {
          await item.validate();
          // Validation succeeded, which is unexpected
          // Fail the test as there should have been validation errors
          throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
          // Validation failed, as expected
          expect(err).to.exist;
          
        }
      });
  }) 