export const testConfig = {
  baseUrl: "https://www.saucedemo.com/",
  defaultPassword: "secret_sauce",
  timeouts: {
    stepTimeoutMs: 60_000,
    navigationTimeoutMs: 60_000
  },
  paths: {
    screenshotsDir: "reports/screenshots",
    videosDir: "reports/videos",
    jsonReportDir: "reports/json",
    htmlReportDir: "reports/html"
  }
} as const;
