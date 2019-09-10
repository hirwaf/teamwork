import joi from '@hapi/joi';
import Helpers from '../Helpers';

const UserController = {
  UserSignUp(request, response) {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      jobRole,
      department,
      address,
    } = request.body;
    const schema = joi.object()
      .keys({
        firstName: joi.string()
          .min(3)
          .trim()
          .required(),
        lastName: joi.string()
          .min(3)
          .trim()
          .required(),
        email: joi.string()
          .email()
          .trim()
          .required(),
        password: joi.string()
          .min(6)
          .required(),
        gender: joi.string()
          .min(3)
          .required(),
        jobRole: joi.string()
          .min(3)
          .trim()
          .required(),
        department: joi.string()
          .min(3)
          .trim()
          .required(),
        address: joi.string()
          .min(3)
          .trim()
          .required(),
      });
    const validation = joi.validate(request.body, schema, { abortEarly: false });
    if (validation.error == null) {
      const token = Helpers.generateToken(5);
      const hashedPassword = Helpers.hashPassword(password);
      response.status(201)
        .send({
          status: response.statusCode,
          message: 'User created successfully',
          data: {
            token,
            firstName,
            lastName,
            email,
            gender,
            jobRole,
            department,
            address,
            user_id: 5,
            password: hashedPassword
          },
        });
    } else {
      const errors = [];
      for (let index = 0; index < validation.error.details.length; index++) {
        errors.push(validation.error.details[index].message.split('"')
          .join(''));
      }
      response.status(422)
        .send({
          status: response.statusCode,
          message: errors,
        });
    }
  },
  UserLogin(request, response) {
    const staticData = {
      id: 5,
      firstName: 'hirwa',
      lastName: 'felix',
      email: 'hirwaf.1@gmail.com',
      password: '$2b$08$k5LNWfkiwEUmXgMGzvW1KOnLXd8JZkmqZGqMNqbbiehzEBUFlQEv2',
      gender: 'male',
      jobRole: 'developer',
      department: 'Software developer',
      address: 'kigali-kicukiro-noboye',
    };
    const { email, password } = request.body;
    const schema = joi.object()
      .keys({
        email: joi.string()
          .email()
          .required(),
        password: joi.string()
          .required(),
      });
    const validation = joi.validate(request.body, schema, { abortEarly: false });
    if (validation.error == null) {
      if (Helpers.comparePassword(staticData.password, password) && staticData.email === email) {
        const token = Helpers.generateToken(staticData.id);
        response.status(200).send({
          status: response.statusCode,
          message: 'User is successfully logged in',
          data: {
            token,
            user_id: staticData.id,
            firstName: staticData.firstName,
            lastName: staticData.lastName,
            email: staticData.email,
            gender: staticData.gender,
            jobRole: staticData.jobRole,
            department: staticData.department,
            address: staticData.address,
          },
        });
      } else {
        response.status(400).send({
          status: response.statusCode,
          message: 'Invalid credentials',
        });
      }
    } else {
      const errors = [];
      for (let index = 0; index < validation.error.details.length; index++) {
        errors.push(validation.error.details[index].message.split('"')
          .join(''));
      }
      response.status(422).send({
        status: response.statusCode,
        message: errors,
      });
    }
  },
};

export default UserController;