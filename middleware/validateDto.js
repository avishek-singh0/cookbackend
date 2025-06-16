const validateDto = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Validation failed",
      errors: result.error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }))
    });
  }

  req.body = result.data; // Clean and valid
  next();
};

module.exports = validateDto;
