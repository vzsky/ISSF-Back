const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    user: {
        type : String,
        require : true,
        min : 6,
    },
    password: {
        type : String, 
        require : true, 
        min : 6,
    }
});

module.exports = mongoose.model('User', UserSchema);