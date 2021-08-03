const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const profileSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  access: {
    type: String,
    required: true,
    default: "user"
  },
  active: {
    type: Boolean,
    required: true,
    default: true
  },
  certifications:[ 
    {
      certification: {
        type: Schema.Types.ObjectId,
        ref: "Certification"
      },
      acquired: {
        type: String
      },
      required:{
        type: Boolean,
        default: false
      },
      valid: {
        type: Boolean,
        default: false
      },
      certifier:{
        type: Schema.Types.ObjectId,
        ref:"Profile"
      }
      
    },
  ],
  audits: [
    {
      type: Schema.Types.ObjectId,
      required: true,
      ref:"Audit",
    },
  ],
});

// set up pre-save middleware to create password
profileSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
profileSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const Profile = model('Profile', profileSchema);

module.exports = Profile;
