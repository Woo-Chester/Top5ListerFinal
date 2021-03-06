const auth = require('../auth')
const Comment = require('../models/comment-model')

createComment = async (req, res) => {
    try{
        const { list_id, commenter, comment } = req.body;
        const newComment = new Comment({
            list_id, commenter, comment
        });
        const savedComment = await newComment.save();
        const token = auth.signToken(savedComment);
        await res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        }).status(200).json({
            success: true
        }).send();
    }
    catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

getListComments = async (req, res) => {
    await Comment.find({list_id: req.params.id}, (err, comments) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!comments) {
            console.log("!comment.length");
            return res
                .status(404)
                .json({ success: false, error: 'No comments found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            //console.log("Found Comments: " + comments.length)
            let list_comments = [];
            for (let key in comments) {
                let list = comments[key];
                let comment = {
                    _id: list._id,
                    list_id: list.list_id,
                    commenter: list.commenter,
                    comment: list.comment
                };
                list_comments.push(comment);
            }
            return res.status(200).json({ success: true, comments: list_comments })
        }
    }).catch(err => console.log(err))
}


module.exports = {
    createComment,
    getListComments
}