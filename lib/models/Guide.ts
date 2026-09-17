import { Schema, models, model } from "mongoose";

const SectionSchema = new Schema(
  { heading: { type: String, required: true }, content: { type: String, required: true } },
  { _id: false }
);
const FaqSchema = new Schema(
  { question: { type: String, required: true }, answer: { type: String, required: true } },
  { _id: false }
);

const GuideSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    category: { type: String, required: true, index: true },
    title: { type: String, required: true },
    metaTitle: { type: String, required: true },
    metaDescription: { type: String, required: true },
    h1: { type: String, required: true },
    intro: { type: String, required: true },
    sections: [SectionSchema],
    faq: [FaqSchema],
    relatedTools: [{ type: String }],
    relatedGuides: [{ type: String }],
    indexable: { type: Boolean, default: true, index: true },
    lastUpdated: { type: Date, default: Date.now },
    author: { type: String },
    reviewer: { type: String },
    status: { type: String, enum: ["draft", "published"], default: "draft", index: true },
  },
  { timestamps: true }
);

export default models.Guide || model("Guide", GuideSchema);
