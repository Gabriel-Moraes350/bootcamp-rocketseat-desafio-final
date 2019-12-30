module.exports = {
  up: QueryInterface => {
    return QueryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Test Student',
          email: 'test@gmail.com',
          weight: 80.0,
          height: 1.71,
          birthDate: '2000-10-10',
        },
      ],
      {}
    );
  },

  down: () => {},
};
