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
    },
    name : {
        type : String,
        require : true,
    },
    school : {
        type : String,
        require : true,
    },
    country : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : false,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Project",
    },
});

module.exports = mongoose.model('User', UserSchema);