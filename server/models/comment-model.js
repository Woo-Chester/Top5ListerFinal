const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CommentSchema = new Schema(
    {
        list_id: {type: String, required: true},
        commenter: {type: String, required: true},
        comment: {type: String, required: true}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Comment', CommentSchema)
