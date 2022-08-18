const {verify} = require('jsonwebtoken');

exports.authCheck = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        try {
            const decoded = verify(bearerToken, process.env.JWT_SECRET)
            req.decodedToken = decoded;
            next();    
        }catch (err) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized'
            });
        }
    } else {
        res.status(401).json({
            success: false,
            message: 'unauthorized'
        })
    }
}