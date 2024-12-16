const mongoose = require('mongoose')
const QuerySchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    query: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
    votes: {

        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            query: {
                type: String,
                required: true,
            },
            userProfilePic: {
                type: String,
            },
            username: {
                type: String,
            },
        },
    ],
},
    {
        timestamps: true,
    }
);
module.exports = mongoose.model("Query", QuerySchema)