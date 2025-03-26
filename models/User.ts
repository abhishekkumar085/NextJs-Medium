import mongoose, { Document } from 'mongoose';

interface IPost extends Document {
  firebaseUid: string;
  name: string;
  email: string;
  profilePic: string;
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
}
const userSchema = new mongoose.Schema<IPost>(
  {
    firebaseUid: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

// const User = mongoose.model('User', userSchema);
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
