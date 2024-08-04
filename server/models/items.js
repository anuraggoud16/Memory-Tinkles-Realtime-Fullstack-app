const mongoose =require('mongoose')

const itemSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    memories: [{
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]
});

const itemModel = mongoose.model("Item", itemSchema);
module.exports = itemModel