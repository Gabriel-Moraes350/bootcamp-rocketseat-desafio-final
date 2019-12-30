module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          id: 1,
          name: 'Test Student',
          email: 'test@gmail.com',
          weight: 80.0,
          height: 1.71,
          birth_date: '2000-10-10',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('students', null, {});
  },
};
