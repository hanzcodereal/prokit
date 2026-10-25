export type ToolResult = {
  time: string;
  status: boolean;
  error?: string;
  message?: string | null;
  [k: string]: unknown;
};

export type LogEntry = {
  id: string;
  at: string;
  level: "info" | "ok" | "err";
  text: string;
};