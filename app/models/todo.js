var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    listItem: {
        type: String,
        default: 'listItem'
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
    },
    grp: {
        type: String, 
        default: 'grp'
    },
    listName: {
        type: String, 
        default: 'listName'
    }
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Todo', userSchema);