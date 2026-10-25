import axios from "axios";

export const BASE_URL = "https://flox-spamotp.vercel.app/api";
export const BUG_API_URL = "https://flox-spamotp.vercel.app/api/bug";
export const ORIGIN_URL = "https://flox-spamotp.vercel.app";
export const SECRET_TOKEN = "PARADOX_SUPER_SECRET_998877";

export const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  Origin: ORIGIN_URL,
  Referer: `${ORIGIN_URL}/`,
  "X-Paradox-Token": SECRET_TOKEN,
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
};

export const client = axios.create({
  baseURL: BASE_URL,
  headers: defaultHeaders,
  timeout: 30000,
});