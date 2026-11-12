export const SITE = {
  name: "OneSquad",
  description: "A second-brain-inspired workspace that brings project knowledge, design, code, and operations together.",
  repository: "https://github.com/dktunited/one-squad",
  community: "https://chat.google.com/room/AAQADS7Zzp8?cls=7",
};

export const categories = [
  { id: "tutorials", title: "Tutorials", label: "Learning-oriented", description: "Follow a guided walkthrough with the shared project context." },
  { id: "how-to", title: "How-to Guides", label: "Problem-oriented", description: "Practical steps for adopting OneSquad in your project." },
  { id: "explanation", title: "Explanation", label: "Understanding-oriented", description: "Understand the shared context, workflow, and project decisions." },
  { id: "reference", title: "Reference", label: "Information-oriented", description: "Find repository conventions, documentation, and reusable templates." },
] as const;

export type Category = typeof categories[number]["id"];

export interface SearchEntry {
  title: string;
  summary: string;
  href: string;
  text: string;
  category: string;
}
