const mocha = require('mocha');
const assert = require('assert');
const userModel = require('../data/models/user');

describe('demo test', function(done) {

  it('first test', function(){
    assert(2 + 3 === 5);
  });


  it('saving test', function(){

    var user = new userModel({
      username: 'test_username',
      name: 'test_name',
      surename: 'test_surname',
      email: 'test_email',
      age: 22
    });

    user.save().then(function(){
      assert(user.isNew === false);
      done();
    });

  });



});
