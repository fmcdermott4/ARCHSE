const {Schema, model} = require('mongoose');

const certificationSchema = new Schema({
    certificationClass:{
        type:String
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    validity: {
        type: String,
        required: true
    },
    additionalData:{
        type: String,
        trim: true,
        default: "Blank"
    }
});

const Certification = model('Certification', certificationSchema);

module.exports = Certification;