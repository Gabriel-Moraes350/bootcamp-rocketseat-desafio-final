export default error => {
  const errors = error.details.map(err => {
    return err.message;
  });

  return {
    error: 'Invalid data sent',
    message: errors,
  };
};
