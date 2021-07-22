const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    username:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password:{
        type: String,
        required: true
    },
    audits:[
        {
            type:String
        }
    ]
});

const User = model('User', userSchema);

module.exports = User;