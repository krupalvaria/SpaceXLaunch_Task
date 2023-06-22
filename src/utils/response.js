const createResponse = (res, status, message, payload) => res.status(status).json({
  status,
  message,
  payload
});

module.exports = createResponse;
