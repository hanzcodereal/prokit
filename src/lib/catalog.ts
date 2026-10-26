export type Field = { name: string; placeholder: string; type?: string };

export type ToolDef = {
  slug: string;
  title: string;
  category: string;
  api: string;
  fields: Field[];
  buttonLabel?: string;
  extra?: "bugType" | "senderMode";
};

export type CategoryDef = {
  slug: string;
  title: string;
  tools: string[];
};

export const categories: CategoryDef[] = [
  { slug: "spam-otp", title: "Spam OTP", tools: ["otp"] },
  { slug: "bug-wa", title: "Bug WhatsApp", tools: ["senders", "pairsender", "delsender", "bug"] },
];

export const tools: Record<string, ToolDef> = {
  otp: {
    slug: "otp",
    title: "Spam OTP",
    category: "spam-otp",
    api: "/api/otp",
    fields: [{ name: "phones", placeholder: "628xxx" }],
    buttonLabel: "Send OTP",
  },
  senders: {
    slug: "senders",
    title: "List Senders",
    category: "bug-wa",
    api: "/api/senders",
    fields: [],
    buttonLabel: "Refresh",
  },
  pairsender: {
    slug: "pairsender",
    title: "Pair Sender",
    category: "bug-wa",
    api: "/api/pairsender",
    fields: [{ name: "phone", placeholder: "628xxx" }],
    buttonLabel: "Pair",
    extra: "senderMode",
  },
  delsender: {
    slug: "delsender",
    title: "Delete Sender",
    category: "bug-wa",
    api: "/api/delsender",
    fields: [{ name: "senderId", placeholder: "sender id" }],
    buttonLabel: "Delete",
  },
  bug: {
    slug: "bug",
    title: "Bug WA",
    category: "bug-wa",
    api: "/api/bug",
    fields: [
      { name: "senderId", placeholder: "sender id" },
      { name: "phone", placeholder: "target 628xxx" },
    ],
    buttonLabel: "Send Bug",
    extra: "bugType",
  },
};

export function getTool(slug: string): ToolDef | undefined {
  return tools[slug];
}

export function getCategory(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}
