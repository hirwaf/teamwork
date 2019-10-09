import { CreateEmployeesTable, CreateArticlesTable } from './migrations';

const InitDB = async () => {
  await CreateEmployeesTable.run();
  await CreateArticlesTable.run();
};

module.exports = InitDB;

require('make-runnable');