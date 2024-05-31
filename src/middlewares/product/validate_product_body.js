const validateBody = (req, res, next) => {
  const { name, description, category } = req.body;

  if (!name) {
    res.status(400).json({ error: "Name is a required field" });
  } else if (!description) {
    res.status(400).json({ error: "Description is a required field" });
  } else if (!category) {
    res.status(400).json({ error: "Category is a required field" });
  } else {
    next();
  }
};

export default validateBody;
