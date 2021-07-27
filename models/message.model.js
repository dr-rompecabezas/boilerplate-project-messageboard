const mongoose = require('mongoose')

// Schema
const MessageSchema = new mongoose.Schema({
    board: { type: String },
    text: { type: String },
    reported: { type: Boolean },
    delete_password: { type: String },
    replies: [{
        text: { type: String },
        reported: { type: Boolean },
        delete_password: { type: String },
        created_on: { type: Date }
    }],
    created_on: { type: Date },
    bumped_on: { type: Date }
})

// Export Model Constructor
module.exports = mongoose.model('Message', MessageSchema)