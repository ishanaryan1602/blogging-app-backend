const jwt = require('jsonwebtoken');

const secret_key = "$ecret_key@123"

function verifyToken(token){
    const payload = jwt.verify(token, secret_key);
    return payload;
}

module.exports = {
    verifyToken
}
