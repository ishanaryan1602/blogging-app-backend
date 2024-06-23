const verifyToken = require("../utils/verifyToken");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenVal = req.cookies[cookieName];
    if (!tokenVal) {
      return next();
    } else {
      try {
        const userPayload = verifyToken(tokenVal);
        req.user = userPayload;
        console.log(userPayload);
      } catch (err) {
        console.log(err.message);
      }
      return next();
    }
  };
}

module.exports = checkForAuthenticationCookie;
