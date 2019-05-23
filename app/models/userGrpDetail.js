var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    detail: {
        type: String
    },
    grp: {
        type: String, 
        unique : true
    },
    private: {
        type: String,
        default: 'N'        
    },
});

module.exports = mongoose.model('UserGrpDetail', userSchema);
