import mongoose, { Document } from 'mongoose';

interface IPost extends Document {
  firebaseUid: string;
  name: string;
  email: string;
  profilePic: string;
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
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
