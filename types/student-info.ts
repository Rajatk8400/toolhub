export type StudentInfoType = "exam" | "scholarship" | "admission" | "job";

export interface StudentInfoItem {
  slug: string;
  type: StudentInfoType;
  title: string;
  summary: string; // short 1-2 sentence description
  eligibility?: string;
  applicationDeadline?: string; // ISO date, optional — many items won't have one yet
  applyUrl?: string; // link to the official application page
  officialSourceUrl: string; // required — every published item must cite an official source
  status: "upcoming" | "open" | "closed" | "archived";
  lastVerified: string; // ISO date — when an editor last checked this against the source
  state?: string; // for India-specific items, optional
  educationLevel?: string;
}
