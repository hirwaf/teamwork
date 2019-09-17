import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const Helpers = {
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  generateToken(userId) {
    // const random = Math.random().toString(36).substring(7);
    // return bcrypt.hashSync(token, bcrypt.genSaltSync(8));
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
  },
};

export default Helpers;