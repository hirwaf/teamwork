import { CreateEmployeesTable, CreateArticlesTable } from './migrations';
import CreateCommentsTable from './migrations/create_comments_table';

const InitDB = async () => {
  await CreateEmployeesTable.run();
  await CreateArticlesTable.run();
  await CreateCommentsTable.run();
};

module.exports = InitDB;

require('make-runnable');