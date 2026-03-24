import {
  After,
  Before,
  ITestCaseHookParameter,
  Status,
  setDefaultTimeout
} from "@cucumber/cucumber";
import fs from "node:fs";
import path from "node:path";
import { testConfig } from "../config/testConfig";
import { CustomWorld } from "../types/customWorld";
import { sanitizeFileName } from "../utils/sanitizeFileName";

setDefaultTimeout(testConfig.timeouts.stepTimeoutMs);

Before(async function (this: CustomWorld): Promise<void> {
  await this.init();
});

After(async function (
  this: CustomWorld,
  scenario: ITestCaseHookParameter
): Promise<void> {
  if (scenario.result?.status === Status.FAILED) {
    fs.mkdirSync(testConfig.paths.screenshotsDir, { recursive: true });
    const scenarioName = sanitizeFileName(scenario.pickle.name);
    const filePath = path.join(
      testConfig.paths.screenshotsDir,
      `${scenarioName}-${Date.now()}.png`
    );
    if (this.page) {
      await this.page.screenshot({ path: filePath, fullPage: true });
      const imageBuffer = fs.readFileSync(filePath);
      await this.attach(imageBuffer, "image/png");
    }
  }

  if (this.context) {
    await this.context.close();
  }

  if (this.browser) {
    await this.browser.close();
  }
});
