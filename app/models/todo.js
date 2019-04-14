var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    text: {
        type: String,
        default: 'text'
    },
    ownerID: {
        type: String,
        default: 'ownerID'
    },
    screenName: {
        type: String,
        default: 'screenName'      
    },
    other: {
        type: String,
        default: 'other'
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Todo', userSchema);