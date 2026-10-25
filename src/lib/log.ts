import type { LogEntry } from "./types";

export function makeLog(level: LogEntry["level"], text: string): LogEntry {
  return {
    id: Math.random().toString(36).slice(2, 10),
    at: new Date().toLocaleTimeString("id-ID", { hour12: false }),
    level,
    text,
  };
}