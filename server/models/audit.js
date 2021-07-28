const {Schema, model} = require('mongoose');

const auditSchema = new Schema({
    profile: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"Profile",
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"Category",
    },
    timeSubmitted: {
        type: String,
        required: true
    },
    answers: [
        {
            question: { 
                type: String
            },
            answer: { 
                type: String
            }
        }
    ]

});

const Audit = model('Audit', auditSchema);
module.exports = Audit;