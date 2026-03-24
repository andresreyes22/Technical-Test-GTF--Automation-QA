import { BasePage } from "./BasePage";

export class CheckoutOverviewPage extends BasePage {
  private readonly finishButton = this.byTestId("finish");

  public async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }
}
