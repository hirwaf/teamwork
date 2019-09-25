import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import joi from '@hapi/joi';
import server from '../../index';

chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

let token;
before((done) => {
  const login = {
    email: 'hirwaf.1@gmail.com',
    password: 'password',
  };

  chai.request(server)
    .post('/api/v1/auth/signin/')
    .send(login)
    .end((error, response) => {
      token = response.body.data.token;
      done();
    });
});

describe('Articles endpoint tests', () => {
  it('should fail due to token issues', (done) => {
    const data = {};
    chai.request(server)
      .post('/api/v1/articles')
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .to
          .be
          .oneOf([401, 400]);
        response.body.should.have.property('message')
          .to
          .be
          .oneOf(['Unauthorized, No token provided', 'Token expired', 'Invalid token']);
      });
    done();
  });
  it('Should fail to create an article ', (done) => {
    const data = {};
    chai.request(server)
      .post('/api/v1/articles')
      .send(data)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(422);
      });
    done();
  });
  it('should create an article', (done) => {
    const data = {
      title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
      image: 'https://images.unsplash.com/photo-1568685002001-1017b6b99e44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=610&q=80',
      article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
    chai.request(server)
      .post('/api/v1/articles')
      .send(data)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(201);
        response.body.should.have.property('message')
          .equal('Article successfully created');
        response.body.should.have.property('data');
        response.body.data.should.be.an('Object');
        response.body.data.should.have.property('createdOn');
        response.body.data.should.have.property('title')
          .equal(data.title);
        response.body.data.should.have.property('image')
          .equal(data.image);
        response.body.data.should.have.property('article')
          .equal(data.article);
      });
    done();
  });

  it('should not found article', (done) => {
    const articleID = 1;
    chai.request(server)
      .get(`/api/v1/articles/${articleID}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(404);
        response.body.should.have.property('message')
          .equal('Article not found !');
      });
    done();
  });

  it('should found article', (done) => {
    const articleID = 5;
    chai.request(server)
      .get(`/api/v1/articles/${articleID}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(200);
        response.body.should.have.property('message')
          .equal('Article found !');
        response.body.should.have.property('data');
        response.body.data.should.be.an('Object');
        response.body.data.should.have.property('id');
        response.body.data.should.have.property('createdOn');
        response.body.data.should.have.property('title');
        response.body.data.should.have.property('article');
        response.body.data.should.have.property('image');
        response.body.data.should.have.property('authorId');
        response.body.data.should.have.property('comments');
      });
    done();
  });

  it('should get feeds', (done) => {
    chai.request(server)
      .get('/api/v1/feeds')
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(200);
        response.body.should.have.property('message')
          .equal('Success');
        response.body.should.have.property('data');
      });
    done();
  });

  it('should delete article', (done) => {
    const articleID = 4;
    chai.request(server)
      .delete(`/api/v1/articles/${articleID}`)
      .set('token', token)
      .end((request, response) => {
        response.status.should.equal(204);
      });
    done();
  });

  it('should fail to delete article', (done) => {
    const articleID = 5;
    chai.request(server)
      .delete(`/api/v1/articles/${articleID}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(404);
        response.body.should.have.property('message')
          .equal('Article Not Found !!');
      });
    done();
  });

  it('should fail to add comment', (done) => {
    const comment = '';
    const articleId = 4;
    chai.request(server)
      .post(`/api/v1/articles/${articleId}/comments`)
      .set('token', token)
      .send({ comment })
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(422);
      });
    done();
  });

  it('should add a comment', (done) => {
    const comment = 'this is what i used to say to people and didn\'t believe me !!';
    const articleId = 4;
    chai.request(server)
      .post(`/api/v1/articles/${articleId}/comments`)
      .set('token', token)
      .send({ comment })
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(201);
        response.body.should.have.property('message').equal('Comment successfully added.');
        response.body.data.should.have.property('articleTitle');
        response.body.data.should.have.property('article');
        response.body.data.should.have.property('comment').equal(comment);
      });
    done();
  });
});