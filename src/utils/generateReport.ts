import fs from "node:fs";
import report from "multiple-cucumber-html-reporter";
import { testConfig } from "../config/testConfig";

fs.mkdirSync(testConfig.paths.htmlReportDir, { recursive: true });

report.generate({
  jsonDir: testConfig.paths.jsonReportDir,
  reportPath: testConfig.paths.htmlReportDir,
  reportName: "SauceDemo Automation Report",
  pageTitle: "QA Technical Test Report",
  metadata: {
    browser: {
      name: "chromium",
      version: "latest"
    },
    device: "Local machine",
    platform: {
      name: process.platform,
      version: process.version
    }
  },
  customData: {
    title: "Execution Info",
    data: [
      { label: "Project", value: "Technical-Test-GTF--Automation-QA" },
      { label: "Framework", value: "Cucumber + Playwright + TypeScript" }
    ]
  }
});
