const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    branch : {
        type : String,
        require : true,
    },
    code : {
        type : String,
        require : true,
    }
});

module.exports = mongoose.model('Project', ProjectSchema);