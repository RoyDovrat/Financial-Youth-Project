const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        description: { type: String, required: true }
    },

    { versionKey: false }
);

const Topic = mongoose.model('topic', topicSchema);

module.exports = Topic;