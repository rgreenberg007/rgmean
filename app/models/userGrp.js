var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {
        type: String
    },
    grp: {
        type: String
    },
    grpOwner: {
        type: String,
        default: 'N'        
    },
});

module.exports = mongoose.model('UserGrp', userSchema);
