const {Schema, model} = require('mongoose');



const categorySchema = new Schema({
    category:{
        type: String,
        required: true,
        trim: true
    },
    auditType:{
        type: String,
        required: true
    },
    questions: [
            {
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
        }
    ]
});

const Category = model('Category', categorySchema);

module.exports = Category;