const {Schema, model} = require('mongoose');

const certificationSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    validity: {
        type: Number,
        required: true
    }
});

const Certification = model('Certification', certificationSchema);

module.exports = Certification;