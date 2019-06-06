var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    name: {
        type: String,
        unique : true
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
    },
    itemCnt : {
        type: String,
        default: "0"
    }
});

module.exports = mongoose.model('myList', userSchema);
