const Query = require('../models/Query')
const User = require('../models/User')
const createQuery = async (req, res) => {
    try {
        const { postedBy, query, image } = req.body;
        if (!query || image || postedBy) {
            return res.status(400).json({ error: "Postedby and text fields are required" });
        }
        const user = await User.findById(postedBy);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to create post" });
        }
const newquery = new Query({postedBy,query,image})
const savequery = await newquery.save();
res.status(201).json(savequery);
    } catch (error) {
        console.error(error);
    }

}
const getQueries = async(req,res)=> {
    try {
        const queries = await Query.find();
        res.status(201).json(queries);
    } catch (error) {
        console.error(error);
    }
}
module.exports = {createQuery,getQueries}