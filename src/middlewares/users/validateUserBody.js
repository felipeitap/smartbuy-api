const validateBody = (req, res, next) => {
  const { type, email, phone, name, address, cnpj, username, password } =
    req.body;

  if (!type) {
    res.status(400).json({ error: "Type is a required field" });
  } else if (!email) {
    res.status(400).json({ error: "Email is a required field" });
  } else if (!phone) {
    res.status(400).json({ error: "Phone is a required field" });
  } else if (!name) {
    res.status(400).json({ error: "Name is a required field" });
  } else if (!address) {
    res.status(400).json({ error: "Address is a required field" });
  } else if (!cnpj) {
    res.status(400).json({ error: "Cnpj is a required field" });
  } else if (!username) {
    res.status(400).json({ error: "Username is a required field" });
  } else if (!password) {
    res.status(400).json({ error: "Password is a required field" });
  } else {
    next();
  }
};

export default validateBody;
