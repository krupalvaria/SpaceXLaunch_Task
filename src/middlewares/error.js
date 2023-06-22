const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: statusCode,
    message
  });
};

module.exports = {
  handleError
};
