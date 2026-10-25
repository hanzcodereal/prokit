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
  { slug: "spam-otp", title: "Spam OTP · WhatsApp & SMS", tools: ["otp"] },
  { slug: "installer", title: "Installer · VPS Protection", tools: ["protect"] },
  { slug: "bug-wa", title: "Bug WhatsApp · WhatsApp Tools", tools: ["senders", "pairsender", "delsender", "bug"] },
  { slug: "tools", title: "Tools · Utility Tools", tools: ["skip", "apk"] },
  { slug: "premium", title: "Premium Gratis · Alight Motion", tools: ["alight"] },
  { slug: "subdomain", title: "Subdomain · Cloudflare DNS", tools: ["list", "create", "history"] },
];

export const tools: Record<string, ToolDef> = {
  otp: {
    slug: "otp",
    title: "Spam OTP",
    category: "spam-otp",
    api: "/api/otp",
    fields: [{ name: "phones", placeholder: "628xxx,628yyy,628zzz" }],
    buttonLabel: "Send OTP",
  },
  protect: {
    slug: "protect",
    title: "VPS Protection",
    category: "installer",
    api: "/api/protect",
    fields: [
      { name: "host", placeholder: "host / ip" },
      { name: "password", placeholder: "password", type: "password" },
    ],
    buttonLabel: "Install",
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
  skip: {
    slug: "skip",
    title: "Skip Link",
    category: "tools",
    api: "/api/skip",
    fields: [{ name: "url", placeholder: "https://..." }],
    buttonLabel: "Resolve",
  },
  apk: {
    slug: "apk",
    title: "Web → APK",
    category: "tools",
    api: "/api/apk",
    fields: [
      { name: "url", placeholder: "https://..." },
      { name: "name", placeholder: "app name" },
    ],
    buttonLabel: "Build",
  },
  alight: {
    slug: "alight",
    title: "Alight Motion",
    category: "premium",
    api: "/api/alight",
    fields: [
      { name: "email", placeholder: "email", type: "email" },
      { name: "verifyLink", placeholder: "verify link (opsional)" },
    ],
    buttonLabel: "Send",
  },
  list: {
    slug: "list",
    title: "List Domains",
    category: "subdomain",
    api: "/api/list",
    fields: [],
    buttonLabel: "Load",
  },
  create: {
    slug: "create",
    title: "Create Subdomain",
    category: "subdomain",
    api: "/api/create",
    fields: [
      { name: "domain", placeholder: "domain.com" },
      { name: "ip", placeholder: "1.2.3.4" },
      { name: "panelHost", placeholder: "panel host" },
      { name: "nodeHost", placeholder: "node host" },
    ],
    buttonLabel: "Create",
  },
  history: {
    slug: "history",
    title: "Subdomain History",
    category: "subdomain",
    api: "/api/history",
    fields: [],
    buttonLabel: "Load",
  },
};

export function getTool(slug: string): ToolDef | undefined {
  return tools[slug];
}

export function getCategory(slug: string): CategoryDef | undefined {
  return categories.find((c) => c.slug === slug);
}