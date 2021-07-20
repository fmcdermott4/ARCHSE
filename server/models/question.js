const {Schema, model} = require('mongoose');

const questionSchema = new Schema({
    category:{
        type: String,
        required: true,
        trim: true
    },
    section: {
        type: String,
        required: true,
        trim:true,
    },
    question: {
        type: String,
        required: true,
        trim:true,
    },
    correctAnswer: {
        type: String,
        required: true,
        trim:true,        
    },
    answers: [
        {
            type:String,
            trim:true,
        }
    ]
});

const Question = model('Question', questionSchema);

module.exports = Question;