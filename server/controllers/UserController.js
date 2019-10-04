import Helpers from '../Helpers';
import users from '../models/user';

const UserController = {
  UserSignUp(request, response) {
    const {
      firstName, lastName, email, password, gender, jobRole, department, address,
    } = request.body;
    const token = Helpers.generateToken(5);
    const hashedPassword = Helpers.hashPassword(password);
    return Helpers.sendResponse(response, 201, 'User created successfully', { token });
  },
  UserLogin(request, response) {
    const { email, password } = request.body;
    const staticData = users.find((user) => user.email === email);

    if (staticData && Helpers.comparePassword(staticData.password, password)) {
      const token = Helpers.generateToken(staticData.id);
      return Helpers.sendResponse(response, 200, 'User is successfully logged in', { token });
    }
    return Helpers.sendResponse(response, 400, 'Invalid credentials');
  },
};

export default UserController;