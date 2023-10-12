const mongoose = require('mongoose');


const postMediaSchema = new mongoose.Schema({
    media_url: [{
        id: {
            type: String,
            required: true
        },
        secure_url: {
            type: String,
            required: true
        },
    }],
});

module.exports = mongoose.model('PostMedia', postMediaSchema)