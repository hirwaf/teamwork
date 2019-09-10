import joi from '@hapi/joi';
import Helpers from '../Helpers';

const UserController = {
  UserSignUp(request, response) {
    const {
      firstName, lastName, email, password, gender, jobRole, department, address,
    } = request.body;
    const schema = joi.object().keys({
      firstName: joi.string().min(3).trim().required(),
      lastName: joi.string().min(3).trim().required(),
      email: joi.string().email().trim().required(),
      password: joi.string().min(6).required(),
      gender: joi.string().min(3).required(),
      jobRole: joi.string().min(3).trim().required(),
      department: joi.string().min(3).trim().required(),
      address: joi.string().min(3).trim().required(),
    });
    const validation = joi.validate(request.body, schema, {
      abortEarly: false,
    });
    if (validation.error == null) {
      const token = Helpers.generateToken();
      response.status(201).send({
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
        },
      });
    } else {
      const errors = [];
      for (let index = 0; index < validation.error.details.length; index++) {
        errors.push(validation.error.details[index].message.split('"').join(''));
      }
      response.status(422).send({
        errors,
        status: response.statusCode,
      });
    }
  },
  UserLogin(request, response) {
  },
};

export default UserController;