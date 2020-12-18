const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(" ")[1];
        console.log(token);
        let decode = jwt.verify(token, process.env.JWT_KEY);
        console.log(decode);
        req.userData = decode;
        next();
    } catch(err) {
        res.status(401).json({
            message: 'auth false!!!',
            error: err
        })
    }
 }
    