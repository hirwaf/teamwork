import { CreateEmployeesTable } from './migrations';

class InitDB {
  static async run() {
    await CreateEmployeesTable.run();
  }
}

export default InitDB;