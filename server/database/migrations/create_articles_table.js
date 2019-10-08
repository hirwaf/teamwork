import Database from '../database';
import { User } from '../../models';
import users from '../../mock/user';
import Helpers from '../../helpers/Helpers';

const database = new Database();

class CreateArticlesTable {
  static up() {
    return 'CREATE TABLE IF NOT EXISTS articles('
      + 'id SERIAL PRIMARY KEY,'
      + 'title VARCHAR (255) NOT NULL,'
      + 'image VARCHAR (255) NOT NULL,'
      + 'article TEXT NOT NULL,'
      + 'authorId INT NOT NULL CHECK (authorId >= 0),'
      + 'createdOn timestamp NOT NULL'
      + ');';
  }

  static down() {
    return 'DROP TABLE IF EXISTS articles;';
  }

  static async run() {
    await database.queryBuilder(CreateArticlesTable.down());
    await database.queryBuilder(CreateArticlesTable.up());
  }
}

export default CreateArticlesTable;