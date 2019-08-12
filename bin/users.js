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
    },
    permission : {
        type : Number,
        require : true,
        min : 0,
        max : 2,
        default : 0,
    }
});

module.exports = mongoose.model('User', UserSchema);