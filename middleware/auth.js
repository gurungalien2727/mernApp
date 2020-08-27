
const jwt = require("jsonwebtoken");
module.exports = function (req, res, next) {
  
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ msg: "Authorization denied" });
  }
 console.log(12);
  try {
    jwt.verify(token, "secret", (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: "Invalid Token" });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error("Auth Error");
    res.status(500).json({ msg: "Server Error" });
  }
};
