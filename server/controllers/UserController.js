import Helpers from '../Helpers';

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
    if (Helpers.comparePassword(staticData.password, password) && staticData.email === email) {
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