var mongoose = require('mongoose');
// name of list, desc of list, owner of list is creator of list
// private - Y not on public set of lists
// grp and view - users in this group and owner can See these lists and their items
// view should replace grp
// edit - users in this group and owner can edit the list and its items
// rank - users in this group and owner can vote / rank items in this list.
// suggestion - allows suggestions for new items - not used at this time
// vote - allows votes rankings on items in this list - also Y
// itemCnt - number of items in the list
// usersVotes - number of users that voted / rtanked items of this list
// totalVotes - total number of votes - what ever number is used for algorithm per vote per item - not used at this time.
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
    view : {
        type: String,
        default: "admin"
    },
    edit : {
        type: String,
        default : "admin"
    },
    rank : {
        type: String,
        default : "admin"
    },
    suggestion : {
        type: String,
        default: "none"
    },
    vote : {
        type: String,
        default: "Y"
    },
    itemCnt : {
        type: Number,
        default: 0
    },
    userVotes : {
        type: Number,
        default: 0
    },
    totalVotes : {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('myList', userSchema);
