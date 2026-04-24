const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  //  If no status set, default to 500
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  let message = err.message;

  //  Handle invalid MongoDB ObjectId
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found';
  }

  //  Clean response (no stack leak in production)
  res.status(statusCode).json({
    message,
    stack:
      process.env.NODE_ENV === 'production'
        ? null
        : err.stack,
  });
};

module.exports = { notFound, errorHandler };