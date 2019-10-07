import chai from 'chai';
import chaiHttp from 'chai-http';
import chaiThings from 'chai-things';
import { describe } from 'mocha';
import joi from '@hapi/joi';
import server from '../../index';
import InitDB from '../database/init_db';
import users from '../mock/user';

chai.should();
chai.use(chaiThings);
chai.use(chaiHttp);

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTcwMTExNzkzfQ.1eVK7gkolstypQM_nykq7i5NRlkiROeGpZVFiNhdbOs';
before(async () => {
  await InitDB.run();
  const login = {
    email: users[0].email,
    password: users[0].textPassword,
  };

  chai.request(server)
    .post('/api/v2/auth/signin/')
    .send(login)
    .end((error, response) => {
      token = response.body.data.token;
    });
});

describe('Articles endpoint tests', () => {
  it('Should fail to create an article ', (done) => {
    const data = {};
    chai.request(server)
      .post('/api/v2/articles')
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
      .post('/api/v2/articles')
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
      .get(`/api/v2/articles/${articleID}`)
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
      .get(`/api/v2/articles/${articleID}`)
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
      .get('/api/v2/feeds')
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
      .delete(`/api/v2/articles/${articleID}`)
      .set('token', token)
      .end((request, response) => {
        response.status.should.equal(204);
      });
    done();
  });

  it('should fail to delete article', (done) => {
    const articleID = 5;
    chai.request(server)
      .delete(`/api/v2/articles/${articleID}`)
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
      .post(`/api/v2/articles/${articleId}/comments`)
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
      .post(`/api/v2/articles/${articleId}/comments`)
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

  it('should fail to edit article due to unavailability of articleId', (done) => {
    const articleId = 8;
    const data = {
      title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
      image: 'https://images.unsplash.com/photo-1568685002001-1017b6b99e44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=610&q=80',
      article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
    chai.request(server)
      .patch(`/api/v2/articles/${articleId}`)
      .set('token', token)
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(404);
        response.body.should.have.property('message').equal('Article no found !');
      });
    done();
  });

  it('should fail to edit article due to validation', (done) => {
    const articleId = 4;
    chai.request(server)
      .patch(`/api/v2/articles/${articleId}`)
      .set('token', token)
      .send({})
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(422);
      });
    done();
  });

  it('should edit article', (done) => {
    const articleId = 4;
    const data = {
      title: 'Eget duis at tellus at urna condimentum mattis pellentesque id',
      image: 'https://images.unsplash.com/photo-1568685002001-1017b6b99e44?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=610&q=80',
      article: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    };
    chai.request(server)
      .patch(`/api/v2/articles/${articleId}`)
      .set('token', token)
      .send(data)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(200);
        response.body.should.have.property('message')
          .equal('Article successfully edited');
        response.body.should.have.property('data');
        response.body.data.should.be.an('Object');
        response.body.data.should.have.property('title')
          .equal(data.title);
        response.body.data.should.have.property('image')
          .equal(data.image);
        response.body.data.should.have.property('article')
          .equal(data.article);
      });
    done();
  });
  it('should not found article, wrong tag', () => {
    const tagId = 56;
    chai.request(server)
      .get(`/api/v2/feeds/${tagId}/tags`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(404);
        response.body.should.have.property('message')
          .equal('No articles found !');
      });
  });

  it('should found articles by tag', () => {
    const tagId = 1;
    chai.request(server)
      .get(`/api/v2/feeds/${tagId}/tags`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(200);
        response.body.should.have.property('message')
          .equal('Success');
        response.body.data.should.be.an('Array');
      });
  });

  it('should not found article by author', () => {
    const authorId = 1;
    chai.request(server)
      .get(`/api/v2/author/articles/${authorId}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(404);
        response.body.should.have.property('message')
          .equal('No articles found !');
      });
  });

  it('should found articles by author', () => {
    const authorId = 5;
    chai.request(server)
      .get(`/api/v2/author/articles/${authorId}`)
      .set('token', token)
      .end((request, response) => {
        response.body.should.have.property('status')
          .equal(200);
        response.body.should.have.property('message')
          .equal('Success');
        response.body.data.should.be.an('Array');
      });
  });
});