import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import joi from '@hapi/joi';
import server from '../../index';

chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

describe('Create user account endpoint', () => {
  it('should return 422 http status', (done) => {
    const data = {};
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(422);
        done();
      });
  });

  it('should return 201 http status', (done) => {
    const data = {
      firstName: 'hirwa',
      lastName: 'felix',
      email: 'hirwaf.1@gmail.com',
      password: '123456',
      gender: 'male',
      jobRole: 'developer',
      department: 'Software Development',
      address: 'kigali-kicukiro-niboye',
    };
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(201);
        response.body.should.have.property('message')
          .equal('User created successfully');
        response.body.should.have.property('data');
        response.body.data.should.be.an('Object');
        response.body.data.should.have.property('token');
        response.body.data.should.have.property('user_id');
        response.body.data.should.have.property('firstName').equal(data.firstName);
        response.body.data.should.have.property('lastName').equal(data.lastName);
        response.body.data.should.have.property('email').equal(data.email);
        response.body.data.should.have.property('gender').equal(data.gender);
        response.body.data.should.have.property('jobRole').equal(data.jobRole);
        response.body.data.should.have.property('department').equal(data.department);
        response.body.data.should.have.property('address').equal(data.address);
        done();
      });
  });
});