import { Schema, models, model } from "mongoose";

const StudentInfoSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    type: { type: String, required: true, enum: ["exam", "scholarship", "admission", "job"], index: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    eligibility: { type: String },
    applicationDeadline: { type: Date },
    applyUrl: { type: String },
    // Required: this content category is explicitly high-stakes (spec §19, §36) — nothing
    // publishes without a citable official source an editor can be held to.
    officialSourceUrl: { type: String, required: true },
    status: { type: String, enum: ["upcoming", "open", "closed", "archived"], default: "upcoming", index: true },
    lastVerified: { type: Date, required: true },
    state: { type: String },
    educationLevel: { type: String },
    publishStatus: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  },
  { timestamps: true }
);

export default models.StudentInfo || model("StudentInfo", StudentInfoSchema);
