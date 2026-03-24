import { BasePage } from "./BasePage";

export class InventoryPage extends BasePage {
  private readonly inventoryContainer = this.byTestId("inventory-container");
  private readonly cartLink = this.byTestId("shopping-cart-link");
  private readonly cartBadge = this.byTestId("shopping-cart-badge");

  public async assertInventoryLoaded(): Promise<void> {
    await this.expectVisible(this.inventoryContainer);
    await this.expectUrlContains("/inventory.html");
  }

  public async addProductToCartByName(productName: string): Promise<void> {
    const productCard = this.page
      .locator(".inventory_item")
      .filter({ has: this.page.locator(".inventory_item_name", { hasText: productName }) });
    const addButton = productCard.locator("button[data-test^='add-to-cart']");
    await this.expectVisible(addButton);
    await addButton.click();
  }

  public async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  public async getCartBadgeCount(): Promise<number> {
    await this.expectVisible(this.cartBadge);
    const text = await this.cartBadge.textContent();
    return Number(text ?? "0");
  }
}
