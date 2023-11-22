import mongoose, { Document } from 'mongoose';

const Schema = mongoose.Schema;

export type UserDocument = Document & {
  name: string;
  email: string;
  googleId: string;
  picture: string;
};

const userSchema = new Schema<UserDocument>({
  name: String,
  email: String,
  googleId: String,
  picture: String,
});

const User = mongoose.model<UserDocument>('User', userSchema);

export default User;
