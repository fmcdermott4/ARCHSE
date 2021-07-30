const {Schema, model} = require('mongoose');

const certificationSchema = new Schema({
    class:{
        type:String
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    validity: {
        type: Number,
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