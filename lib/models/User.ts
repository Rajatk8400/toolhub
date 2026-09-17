import { Schema, models, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    // Optional: users who sign in via Google (or another future OAuth provider) never set a
    // password. Exactly one of passwordHash or googleId should be present in practice, but
    // both are optional here so a credentials user could later link Google (not implemented
    // yet, but the schema doesn't block it).
    passwordHash: { type: String },
    googleId: { type: String, unique: true, sparse: true, index: true },
    avatarUrl: { type: String },
    role: { type: String, enum: ["admin", "editor", "user"], default: "user", index: true },
  },
  { timestamps: true }
);

export default models.User || model("User", UserSchema);
