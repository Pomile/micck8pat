import { QueryInterface, DataTypes } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface) => queryInterface.bulkInsert('Users', [
    {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Mary',
      lastName: 'Slesor',
      email: 'mary.slesor@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      firstName: 'Francis',
      lastName: 'Codewirght',
      email: 'Francis.codewright@gmail.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ], {}),

  down: (queryInterface: QueryInterface) => queryInterface.bulkDelete('People', {}, {}),
};
