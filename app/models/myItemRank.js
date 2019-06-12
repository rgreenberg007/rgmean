var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email:  {
        type: String
    },
    itemId:  {
        type: String
    },
    itemName:  {
        type: String
    },
    listName:  {
        type: String
    },
    rank:  {
        type: Number
    }
});

module.exports = mongoose.model('myItemRank', userSchema);
