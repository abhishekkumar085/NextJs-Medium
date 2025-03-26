import mongoose from 'mongoose';

const likeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: 'Story',
    },
    comment: {
      type: mongoose.Schema.ObjectId,
      ref: 'Comment',
    },
  },
  { timestamps: true }
);

const Like = mongoose.models.Like || mongoose.model('Like', likeSchema);

export default Like;
