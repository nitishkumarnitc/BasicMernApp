const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ProfileVisitorSchema = new Schema({
    profile_id: {
        type: String,
        required: true
    },
    socket_id: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    }

});

module.exports = User = mongoose.model("ProfileVisitorSchema", ProfileVisitorSchema);
