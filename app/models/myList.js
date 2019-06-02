var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    owner: {
        type: String,
        default : "admin"
    },
    private: {
        type: String,
        default: 'N'        
    },
    grp : {
        type: String,
        default: "admin"
    },
    edit : {
        type: String,
        default : "Grp"
    },
    suggestion : {
        type: String,
        default: "none"
    },
    vote : {
        type: String,
        default: "none"
    }
});

module.exports = mongoose.model('myList', userSchema);
