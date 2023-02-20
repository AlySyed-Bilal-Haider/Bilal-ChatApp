export const notfound = (req, res, next) => {
  const error = new Error("Not found routes");
  res.status(404);
  next(error);
};

export const errorHandle = (error, req, res, next) => {
  const statuserror = res.statusCode === 200 ? 500 : statusCode;
  res.status(statuserror);
  res.json({
    message: error.message,
  });
};
