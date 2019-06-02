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
    list: {
        type: String       
    },
    suggestion : {
        type: String,
        default: "N"
    },
    rank : {
        type: String,
        default: "0"
    }
});

module.exports = mongoose.model('myItem', userSchema);
