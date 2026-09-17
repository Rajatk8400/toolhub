import { Schema, models, model } from "mongoose";

const KeywordSchema = new Schema(
  {
    keyword: { type: String, required: true, index: true },
    cluster: { type: String, required: true, index: true },
    primaryCategory: {
      type: String,
      enum: ["tools", "calculators", "students", "pdf", "image", "developer", "seo", "text", "converters", "ai"],
      index: true,
    },
    searchIntent: {
      type: String,
      enum: ["informational", "navigational", "transactional", "commercial"],
      default: "informational",
    },
    priority: { type: String, enum: ["low", "medium", "high"], default: "medium", index: true },
    country: { type: String, default: "global" },
    language: { type: String, default: "en" },
    status: {
      type: String,
      enum: ["research", "planned", "published", "needs-update", "no-longer-relevant"],
      default: "research",
      index: true,
    },
    targetPage: { type: String }, // a tool/guide slug or path this keyword targets
    notes: { type: String },
    // Optional — populated later from external keyword research tools. Never fabricated.
    searchVolume: { type: Number },
    competition: { type: String, enum: ["low", "medium", "high"] },
    cpc: { type: Number },
  },
  { timestamps: true }
);

export default models.Keyword || model("Keyword", KeywordSchema);
