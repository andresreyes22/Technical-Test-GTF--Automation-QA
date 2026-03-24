import { BasePage } from "./BasePage";

export class CheckoutCompletePage extends BasePage {
  private readonly confirmationHeader = this.byTestId("complete-header");

  public async getConfirmationMessage(): Promise<string> {
    await this.expectVisible(this.confirmationHeader);
    const text = await this.confirmationHeader.textContent();
    return (text ?? "").trim();
  }
}
