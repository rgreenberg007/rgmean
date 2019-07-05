var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    email: {
        type: String
    },
    timeStamp : {
        type: Date
    }
});

module.exports = mongoose.model('myLoginRecord', userSchema);
