const jwt = require('jsonwebtoken');

const secretkey = process.env.SECRET_KEY;

function auth(req ,res , next){

    const token = req.headers.authorization;

    if(!token){
        return res.status(401).json({
            message: "You are not authorized"
        });

    }
    try {
        const decoded = jwt.verify(token, secretkey);
         req.user = { id: decoded.id }
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

module.exports = {
    auth
}
