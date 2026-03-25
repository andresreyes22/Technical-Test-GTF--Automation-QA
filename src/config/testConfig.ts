import "dotenv/config";

const toTimeout = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export const testConfig = {
  baseUrl: process.env.BASE_URL ?? "https://www.saucedemo.com/",
  defaultPassword: process.env.SAUCE_PASSWORD ?? "secret_sauce",
  timeouts: {
    stepTimeoutMs: toTimeout(process.env.STEP_TIMEOUT_MS, 60_000),
    navigationTimeoutMs: toTimeout(process.env.NAVIGATION_TIMEOUT_MS, 60_000)
  },
  paths: {
    screenshotsDir: "reports/screenshots",
    videosDir: "reports/videos",
    jsonReportDir: "reports/json",
    htmlReportDir: "reports/html"
  }
} as const;
