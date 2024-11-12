function validateContentType(req, res, next) {
  const validMethods = ['POST', 'PUT', 'PATCH'];
  const contentType = req.headers['content-type'];

  if (validMethods.includes(req.method) && contentType !== 'application/json') {
    return res.status(415).json({ error: 'Content-Type must be application/json' });
  }

  next();
}

export default validateContentType;
