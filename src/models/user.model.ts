import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  fullname: {
    required: true,
    type: String,
  },
});

const User = models.User || model("User", UserSchema);
export default User;
