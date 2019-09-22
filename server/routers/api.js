import express from 'express';
import UserController from '../controllers/UserController';
import Auth from '../middlewares/auth';
import ArticlesController from '../controllers/ArticlesController';

const routers = new express.Router();

routers.route('/').get((request, response) => response.status(400).send({
  status: response.statusCode,
  message: 'Bad Request Error',
}));

routers.route('/auth/signup/').post((request, response) => UserController.UserSignUp(request, response));
routers.route('/auth/signin/').post((request, response) => UserController.UserLogin(request, response));

// Articles APIs

routers.route('/articles').post(Auth.verifyToken, ArticlesController.store);
routers.route('/articles/:articleId').get(Auth.verifyToken, ArticlesController.findOne);

export default routers;