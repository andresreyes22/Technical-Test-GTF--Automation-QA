import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  private readonly checkoutButton = this.byTestId("checkout");

  public async assertProductInCart(productName: string): Promise<void> {
    const itemName = this.page.locator(".inventory_item_name", { hasText: productName });
    await this.expectVisible(itemName);
  }

  public async continueToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}
