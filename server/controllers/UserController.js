import Helpers from '../Helpers';
import users from '../models/user';

const UserController = {
  UserSignUp(request, response) {
    const {
      firstName, lastName, email, password, gender, jobRole, department, address,
    } = request.body;
    const token = Helpers.generateToken(5);
    const hashedPassword = Helpers.hashPassword(password);
    response.status(201)
      .send({
        status: response.statusCode,
        message: 'User created successfully',
        data: {
          token,
        },
      });
  },
  UserLogin(request, response) {
    const { email, password } = request.body;
    const staticData = users.find((user) => user.email === email);

    if (staticData && Helpers.comparePassword(staticData.password, password)) {
      const token = Helpers.generateToken(staticData.id);
      return response.status(200)
        .send({
          status: response.statusCode,
          message: 'User is successfully logged in',
          data: {
            token,
          },
        });
    }
    return response.status(400)
      .send({
        status: response.statusCode,
        message: 'Invalid credentials',
      });
  },
};

export default UserController;