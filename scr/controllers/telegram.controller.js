const axios = require("axios");

exports.sendMessage = async (req, res) => {
    
    const {name, phone_number, message} = req.body
    const text = encodeURIComponent('👤: ' + name + '\n📞: ' + phone_number + '\n📩: ' + message)
    url = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendmessage?chat_id=${process.env.CHANNEL_ID}&text=${text}`
    axios.get(url)
    .then(res.status(200).json({
        success: true,
        message: 'Message sent'
    }))
    .catch(err => res.status(400).json(err));
}