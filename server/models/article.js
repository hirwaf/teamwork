import moment from 'moment';
import Database from '../database/database';

class Article extends Database {
  constructor() {
    super('articles');
  }
}

export default Article;