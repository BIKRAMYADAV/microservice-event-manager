const jwt = require('jsonwebtoken')

const verifyJwt = (req, res, next) => {
    const auth = req.headers.authorization
    console.log('auth is ', auth);
    if(!auth){
        return res.status(400).json({
          message: 'auth header missing'
        });
    }
    const token = auth.split(" ")[1];
    console.log('token is', token)
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded : ', decoded);
  req.user = decoded;
  next()
}

module.exports = verifyJwt