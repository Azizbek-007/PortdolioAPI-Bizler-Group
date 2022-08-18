const { user } = require('../models');
const jwt = require('jsonwebtoken');
const {compare} = require('bcrypt');
const userValidator = require('../validations/userValidation');


const Authentication = {
    login: async (req, res) => {
        const { error } = userValidator.validate(req.body);
        if (error) {
            return res.status(400).json({
                success: false,
                message: errorerror.details[0].message
            });
        }
        const User = await user.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!User) {
            return res.status(400).json({
                success: false,
                message: 'Invalid username or password'
            });
        }
        const isPasswordValid = await compare(req.body.password, User.password);
        if(!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid username or password'
            });
        }
        const token = jwt.sign({ user_id: User.id }, process.env.JWT_SECRET);
        res.json({
            success: true,
            message: 'Authentication successful. The refresh token',
            expiresIn: "24h",
            token: token
        })
    }
}

module.exports = Authentication;