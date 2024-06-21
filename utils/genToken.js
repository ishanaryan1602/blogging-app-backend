const jwt = require('jsonwebtoken');

const secret_key = "$ecret_key@123"

function genToken(user){
    const payload = {
        _id: user._id,
        profileImageUrl: user.profileImageUrl,
        email: user.email,
        role: user.role
    }
    const token = jwt.sign(payload, secret_key);
    return token;
}

module.exports = genToken;
