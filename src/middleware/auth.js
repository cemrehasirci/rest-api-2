const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Yetkisiz erişim. Token eksik!" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Geçersiz veya süresi dolmuş token." });
  }
};

module.exports = auth;