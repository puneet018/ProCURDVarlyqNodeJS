const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");
const { Users } = require("./User");
const Schema = mongoose.Schema;

const CommentsSchema = new Schema({
    sentBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    sentAt: Date,
    liked: [{
        type: Schema.Types.ObjectId,
        ref: 'Users'
    }]
    
})

const PostsSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    message: {
        type: 'String'
    },
    comments: [CommentsSchema],
     createdAt: Date,
    // updatedAt: new Date()


});



module.exports = mongoose.model("Comments", CommentsSchema);
module.exports = mongoose.model("Posts", PostsSchema);
