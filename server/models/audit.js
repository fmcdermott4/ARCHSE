const {Schema, model} = require('mongoose');

const auditSchema = new Schema({
    profile: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
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