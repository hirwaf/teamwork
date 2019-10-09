import { CreateEmployeesTable } from './migrations';

const InitDB = async () => {
  await CreateEmployeesTable.run();
};

module.exports = InitDB;

require('make-runnable');