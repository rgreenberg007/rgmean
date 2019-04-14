var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    grpName: {
        type: String, 
        default: 'grpName'
    },
    ownerID: {
        type: String,
        default: 'ownerID'
    },
    screenName: {
        type: String,
        default: 'screenName'   
    },
    public: {
        type: String,
        default: 'Y'        
    },
    other: {
        type: String,
        default: 'other'
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('toDoGrp', userSchema);