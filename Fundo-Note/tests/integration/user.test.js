/* eslint-disable prettier/prettier */
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


  var ID;

  // 9 - Test case for notes creation
  describe('Notes-Create', () => {
    // eslint-disable-next-line max-len
    it('9. While creating notes due to correct note details status should return 200', (done) => {
      const noteBody = {
        Title: ".Net Basic",
        Descreption: "Concept"
      }
      request(app)
        .post('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .send(noteBody)
        .end((err, res) => {
          ID = res.body.data._id;
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });
  // 10 - Test case for notes creation without authorization
  describe('Notes-Create', () => {
    // eslint-disable-next-line max-len
    it('10. While creating notes without authorization should return status code 500', (done) => {
      const noteBody = {
        Title: ".Net Basic",
        Description: "Concept"
      }
      request(app)
        .post('/api/v1/notes/')
        .send(noteBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 11 - Test case for invalid note description
  describe(' Notes-Create', () => {
    // eslint-disable-next-line max-len
    it('11. While creating notes due to invalid note description status should return 500', (done) => {
      const noteBody = {
        Title: ".Net Basic",
        Description: ""
      }
      request(app)
        .post('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .send(noteBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 12 - Test case for invalid note title
  describe('Notes-Create', () => {
    // eslint-disable-next-line max-len
    it('12. While creating notes due to invalid note title status should return 500', (done) => {
      const noteBody = {
        Title: "",
        Description: "Concept"
      }
      request(app)
        .post('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .send(noteBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(500);
          done();
        });
    });
  });

  // 13 - Test case for get all notes with authorization
  describe(' Getting all notes with authorization', () => {
    // eslint-disable-next-line max-len
    it('13. While getting all notes successfully should return status code 200', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  // 14 - Test case for get all notes without authorization
  describe(' Getting all notes without authorization ', () => {
    // eslint-disable-next-line max-len
    it('14. While getting all notes failed due invalid authorization should return status code 400', (done) => {
      request(app)
        .get('/api/v1/notes/')
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  // 15 - Test case for get note by ID with authorization
  describe(' Getting note by id with authorization ', () => {
    // eslint-disable-next-line max-len
    it('15. While getting note by ID successfully should return status code 201', (done) => {
      request(app)
        .get(`/api/v1/notes/${ID}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });
  // 16 - Test case for get note by ID without authorization
  describe(' Getting note by id without authorization ', () => {
    // eslint-disable-next-line max-len
    it('16. While getting note by ID without authorization failed should return status code 400', (done) => {
      request(app)
        .get(`/api/v1/notes/${ID}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  // 17 - Test case for update note by ID with authorization
  describe(' Update note by id with authorization ', () => {
    // eslint-disable-next-line max-len
    it('17. While updating note by ID successfully complete should return status code 201', (done) => {
      const noteBody = {
        Title: "Javascript Basics",
        Description: "concept"
      }
      request(app)
        .put(`/api/v1/notes/${ID}`)
        .set('authorization', `Bearer ${token}`)
        .send(noteBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(201);
          done();
        });
    });
  });

  // 18 - Test case for update note by ID without authorization
  describe(' Update note by id with authorization ', () => {
    // eslint-disable-next-line max-len
    it('18. While updating note by ID without authorization failed should return status code 400', (done) => {
      const noteBody = {
        Title: "Javascript Basics",
        Description: "concept"
      }
      request(app)
        .put(`/api/v1/notes/${ID}`)
        .send(noteBody)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });

  // 19 - Test case for archive note by ID with authorization
  describe(' Archive note by id with authorization ', () => {
    // eslint-disable-next-line max-len
    it('19. While archive note by ID successfully complete should return status code 202', (done) => {
      request(app)
        .put(`/api/v1/notes/${ID}/isArchive`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });

  //20 - Test case for trash note by ID with authorization
  describe(' Trash note by id with authorization ', () => {
    // eslint-disable-next-line max-len
    it('20. While trash note by ID successfully complete should return status code 202', (done) => {
      request(app)
        .put(`/api/v1/notes/${ID}/isTrash`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(202);
          done();
        });
    });
  });


  // 21 - Test case for delete note by ID with authorization
  describe(' Delete note by id with authorization ', () => {
    // eslint-disable-next-line max-len
    it('21. While deleting note by ID successfully complete should return status code 200', (done) => {
      request(app)
        .delete(`/api/v1/notes/${ID}`)
        .set('authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(200);
          done();
        });
    });
  });

  // 22 - Test case for delete note by ID without authorization
  describe(' Delete note by id with authorization ', () => {
    // eslint-disable-next-line max-len
    it('22. While deleting note by ID without authorization failed should return status code 400', (done) => {
      request(app)
        .delete(`/api/v1/notes/${ID}`)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(400);
          done();
        });
    });
  });
});

