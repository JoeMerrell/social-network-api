const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
  {
    username: {
        type: String,
        required: 'You need to provide a username!',
        trim: true,
        unique: true 
    },
    email: {
        type: String,
        required: 'You need to provide an email address',
        trim: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format('MMMM Do YYYY, h:mm:ss a')
    },
    thoughts: [
      {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
      }
    ],
  friends: [
      {
          type: Schema.Types.ObjectId,
          ref: 'User'
      }
  ]
  },
  { 
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);



// get total count of comments & replies
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('User', UserSchema); // what is this doing exactly?

module.exports = User;