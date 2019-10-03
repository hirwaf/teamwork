import express from 'express';
import UserController from '../controllers/UserController';
import validation from '../middlewares/SchemaValidator';

const auth = new express.Router();
auth.use(validation);
auth.route('/auth/signup/').post((request, response) => UserController.UserSignUp(request, response));
auth.route('/auth/signin/').post((request, response) => UserController.UserLogin(request, response));

export default auth;