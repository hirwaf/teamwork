import express from 'express';
import UserController from '../controllers/UserController';

const routers = new express.Router();

routers.route('/').get((request, response) => response.status(400).send({
  status: response.statusCode,
  message: 'Bad Request Error',
}));

routers.route('/auth/signup/').post((request, response) => UserController.UserSignUp(request, response));

export default routers;