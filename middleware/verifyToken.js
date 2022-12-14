const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
  
    next();
  } catch (error) {
    res.status(401).json({ message: "Falha na autenticação" });
  }
};


module.exports = verifyToken