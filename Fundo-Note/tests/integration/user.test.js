/* eslint-disable no-unused-vars */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => { });
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  // 1 - Test case for user registration
  describe('POST / UserRegistration', () => {
    const userDetails = {
      "firstname": "Prajakta",
      "lastname": "Jagtap",
      "email": "prajakta2412@gmail.com",
      "password": "Pra3914"
    }
    // eslint-disable-next-line max-len
    it('1.Given user details in registration should be saved in database', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });
  // 2- Test case for invalid first name
  describe('POST / UserRegistration', () => {
    const userDetails = {
      "firstname": "P",
      "lastname": "Jagtap",
      "email": "prajakta2412@gmail.com",
      "password": "Pra3914"
    }
    // eslint-disable-next-line max-len
    it('2.Give Creating User for Invalid firstName should return status 500', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  // 3- Test case for invalid last name
  describe('POST / UserRegistration', () => {
    const userDetails = {
      "firstname": "Prajakta",
      "lastname": "J",
      "email": "prajakta2412@gmail.com",
      "password": "Pra3914"
    }
    // eslint-disable-next-line max-len
    it('3.Give Creating User for Invalid Lastname should return status 500', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  // 4- Test case for invalid email-id
  describe('POST / UserRegistration', () => {
    const userDetails = {
      "firstname": "Prajakta",
      "lastname": "Jagtap",
      "email": "prajakta2412@gmail.com",
      "password": "Pra3914"
    }
    // eslint-disable-next-line max-len
    it('4.Give Creating User for invalid email-id should return status 500', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  // 5- Test case for invalid password
  describe('POST / UserRegistration', () => {
    const userDetails = {
      "firstname": "Prajakta",
      "lastname": "Jagtap",
      "email": "prajakta2412@gmail.com",
      "password": "p"
    }
    // eslint-disable-next-line max-len
    it('5.Give Creating user for invalid password should return status 500', (done) => {
      request(app)
        .post('/api/v1/users/register')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });


  // eslint-disable-next-line no-unused-vars
  var token;
  // 6 - Test case for user login
  describe('POST/UserLogin', () => {
    const userDetails = {
      "email": "prajakta2412@gmail.com",
      "password": "Pra3914"
    }
    // eslint-disable-next-line max-len
    it('6.Given user details in login should get logged into account', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userDetails)
        .end((err, res) => {
          token = res.body.data
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });
  // 7 - Test case for invalid user email id
  describe('POST/UserLogin', () => {
    const userDetails = {
      "email": "pra@gmail.com",
      "password": "Pra3914"
    }
    // eslint-disable-next-line max-len
    it('7.While give log in due to invalid email id should return status 500', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
  // 8 - Test case for invalid user password
  describe('POST/UserLogin', () => {
    const userDetails = {
      "email": "prajakta2412@gmail.com",
      "password": "p"
    }
    // eslint-disable-next-line max-len
    it('8.While give log in due to invalid password should return status 500', (done) => {
      request(app)
        .post('/api/v1/users/login')
        .send(userDetails)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });
});
