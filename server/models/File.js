const {Schema, model} = require('mongoose');

const fileSchema = new Schema({
    caption: {
        required: true,
        type: String,
    },
    filename: {
        required: true,
        type: String,
    },
    fileId: {
        required: true,
        type: String,
    },
    createdAt: {
        default: Date.now(),
        type: String,
    },
});

const File = model('File', fileSchema);

module.exports = File;