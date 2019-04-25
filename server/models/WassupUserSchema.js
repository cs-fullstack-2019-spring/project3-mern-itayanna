var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WassupUserSchema = new Schema({
    username:String,
    password:String,
    profilePic:String,
    backgroundPic:String,
    wassupPost:[{postBody:String, postImage:String, postPublic:Boolean}],
});

module.exports = mongoose.model("WassupUser", WassupUserSchema);