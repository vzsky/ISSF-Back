const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type : String,
        require : true,
        min : 4,
    },
    password: {
        type : String, 
        require : true, 
        min : 6,
    }
});

module.exports = mongoose.model('User', UserSchema);