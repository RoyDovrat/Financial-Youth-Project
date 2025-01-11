const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        topic: { type: mongoose.Schema.Types.ObjectId, ref: 'Topic', required: true },
        description: { type: String, required: true },
        length: { type: Number, required: true },
        thumbnail: { type: String, required: true },
        url: { type: String, required: true }
    },

    { versionKey: false }
);

const Video = mongoose.model('video', videoSchema);

module.exports = Video;