import Database from '../database/database';

class User extends Database {
  constructor() {
    super('users');
  }
}

export default User;