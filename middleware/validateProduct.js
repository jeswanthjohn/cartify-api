const validateProduct = (req, res, next) => {
  const { name, price, countInStock } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Valid product name is required' });
  }

  if (price === undefined || typeof price !== 'number' || price <= 0) {
    return res.status(400).json({ message: 'Valid price is required' });
  }

  if (countInStock !== undefined && typeof countInStock !== 'number') {
    return res.status(400).json({ message: 'countInStock must be a number' });
  }

  next();
};

module.exports = validateProduct;