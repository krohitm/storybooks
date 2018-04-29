const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create schema
const StorySchema = new Schema({
  gotitleogleID: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'public'
  },
  allowComments: {
    type: Boolean,
    default: true
  },
  comments: [{
    commentBody: {
      typr: String,
      required: true
    },
    commentDate: {
      type: Date,
      default: Date.now
    },
    commentUser: {
      type: Schema.Types.ObjectId,
      ref: 'users'
    }
  }],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  data: {
    type: Date,
    default: Date.now
  }
});

//Create collection and add schema
mongoose.model('stories', StorySchema, 'stories');