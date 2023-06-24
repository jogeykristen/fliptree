const mongoose = require('mongoose');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      phonenumber: {
        type: String,
        required: true
      },
      type: {
        type: String,
        enum: ['groom','bride'],
        required: true
      },
      DOB: {
        type: Date,
        required: true
      },
      motherTounge: {
        type: String,
        required: true
      },
      location: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      maritalStatus: {
        type: String,
        required: true
      },
      height: {
        type: Number,
        required: true
      },
      caste: {
        type: String,
        required: true
      },
      birthStar: {
        type: String,
      },
      disabled: {
        type: String,
        enum: ['yes', 'no'],
        required: true
      },
      education: {
        type: String,
        required: true
      },
      job: {
        type: String,
        required: true
      },
      bio: {
        type: String,
        required: true
      },
      food: {
        type: String,
        enum: ['vegetarian', 'non-vegetarian'],
        required: true
      },
      drinking: {
        type: String,
        enum: ['yes', 'no', 'occasionally'],
        required: true
      },
      smoking: {
        type: String,
        enum: ['yes', 'no', 'occasionally'],
        required: true
      },
      beliefs: {
        type: String,
        required: true
      },
      hobbies: {
        type: [String],
        required: true
      },
    image: {
        type: String,
        required: true 
      }
});
module.exports.user = mongoose.model('user', User);