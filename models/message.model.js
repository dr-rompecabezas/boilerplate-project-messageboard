const mongoose = require('mongoose')

// Schema
const MessageSchema = new mongoose.Schema({
    board: { type: String, lowercase: true },
    text: { type: String },
    reported: { type: Boolean, default: false, select: false },
    delete_password: { type: String, select: false },
    replies: [{
        text: { type: String },
        reported: { type: Boolean, default: false, select: false },
        delete_password: { type: String, select: false },
        created_on: { type: Date, default: Date.now }
    }],
    created_on: { type: Date, default: Date.now },
    bumped_on: { type: Date, default: Date.now }
})

// Export Model Constructor
module.exports = mongoose.model('Message', MessageSchema)