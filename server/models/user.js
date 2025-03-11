import { Schema, model } from "mongoose";

const userSchema = Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  id: {
    type: String,
  },
});

const User = model("User", userSchema);

export default User;
