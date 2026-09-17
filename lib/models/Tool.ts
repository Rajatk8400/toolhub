import mongoose, { Schema, models, model } from "mongoose";

const FaqSchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const ToolSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    category: {
      type: String,
      required: true,
      enum: ["tools", "calculators", "students", "pdf", "image", "developer", "seo", "text", "converters", "ai"],
      index: true,
    },
    toolName: { type: String, required: true },
    primaryKeyword: { type: String, required: true },
    secondaryKeywords: [{ type: String }],
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    h1: { type: String, required: true },
    intro: { type: String, required: true },
    howToUse: [{ type: String }],
    features: [{ type: String }],
    useCases: [{ type: String }],
    formula: { type: String },
    faq: [FaqSchema],
    relatedTools: [{ type: String }],
    relatedGuides: [{ type: String }],
    indexable: { type: Boolean, default: true, index: true },
    lastUpdated: { type: Date, default: Date.now },
    author: { type: String },
    reviewer: { type: String },
    source: { type: String },
    officialSourceUrl: { type: String },
    component: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  },
  { timestamps: true }
);

export default models.Tool || model("Tool", ToolSchema);
export type ToolDocument = mongoose.InferSchemaType<typeof ToolSchema>;
