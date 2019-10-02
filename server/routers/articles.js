import express from 'express';
import Auth from '../middlewares/auth';
import ArticlesController from '../controllers/ArticlesController';

const articles = new express.Router();
// Articles APIs
articles.use(Auth.verifyToken);
articles.route('/feeds').get(ArticlesController.findAll);
articles.route('/articles').post(ArticlesController.store);
articles.route('/articles/:articleId').get(ArticlesController.findOne);
articles.route('/articles/:articleId').delete(ArticlesController.destroy);
articles.route('/articles/:articleId/comments').post(ArticlesController.addComment);
articles.route('/articles/:articleId').patch(ArticlesController.update);

export default articles;