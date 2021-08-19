const {Schema, model} = require('mongoose');

const fileSchema = new Schema({
    name: String,
    desc: String,
    pdf:
    {
        data: Buffer,
        contentType: String
    }
});

const File = model('File', fileSchema);

module.exports = File;