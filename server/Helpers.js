import bcrypt from 'bcrypt';

const Helpers = {
  generateToken() {
    const random = Math.random().toString(36).substring(7);
    return bcrypt.hashSync(random, bcrypt.genSaltSync(8));
  },
};

export default Helpers;