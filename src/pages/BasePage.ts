import { Locator, Page } from "playwright";

export abstract class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  protected byTestId(testId: string): Locator {
    return this.page.locator(`[data-test="${testId}"]`);
  }

  protected async expectVisible(locator: Locator): Promise<void> {
    await locator.waitFor({ state: "visible" });
  }

  protected async expectUrlContains(fragment: string): Promise<void> {
    if (!this.page.url().includes(fragment)) {
      throw new Error(`Expected URL to include "${fragment}" but got "${this.page.url()}"`);
    }
  }
}
