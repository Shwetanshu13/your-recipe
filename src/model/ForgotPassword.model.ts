import mongoose, { Document, Schema } from "mongoose";

export interface IForgotPassword extends Document {
  email: string;
  otp: string;
  createdAt: Date;
}

const ForgotPasswordSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600,
  },
});

export default mongoose.models.ForgotPassword ||
  mongoose.model<IForgotPassword>("ForgotPassword", ForgotPasswordSchema);
