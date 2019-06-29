var mongoose = require('mongoose');
// listId, listName, listOwner - attributes of the list the comment is on
// ownerEmail, ownerScreenName, ownerId - attributes of the user that created the comment
// comment - the comment itself
// timestamp - timestamp when the comment was created
var userSchema = mongoose.Schema({
    listId: {
        type: String
    },
    listName: {
        type: String
    },
    listOwner: {
        type: String
    },
    ownerEmail: {
        type: String        
    },
    ownerScreenName : {
        type: String
    },
    ownerId : {
        type: String
    },
    comment : {
        type: String
    },
    timeStamp : {
        type: String
    }
});

module.exports = mongoose.model('myComment', userSchema);
