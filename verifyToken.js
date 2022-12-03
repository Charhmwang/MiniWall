const jsonwebtoken = require('jsonwebtoken')

// Verify the user supplied token 
function auth(req, res, next) {
    const token = req.header('auth-token')
    if (!token) {
        return res.status(401).send({message:'Access denied'})
    }
    try {
        const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
        req.user = verified // Send back to the user
        next() // Jump to the next middleware
    } catch(err) {
        return res.status(401).send({message: 'Invalid token'})
    }
}

module.exports = auth