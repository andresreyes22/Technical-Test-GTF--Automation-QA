import { Given, Then, When } from "@cucumber/cucumber";
import assert from "node:assert";
import { CustomWorld } from "../types/customWorld";

Given("que ingreso al login de SauceDemo", async function (this: CustomWorld): Promise<void> {
  await this.loginPage.visit();
});

When(
  "inicio sesión con usuario {string} y contraseña {string}",
  async function (this: CustomWorld, username: string, password: string): Promise<void> {
    await this.loginPage.login(username, password);
  }
);

When("inicio sesión con el usuario {string}", async function (this: CustomWorld, username: string): Promise<void> {
  await this.loginPage.loginAs(username);
});

Then("debería ver el inventario de productos", async function (this: CustomWorld): Promise<void> {
  await this.inventoryPage.assertInventoryLoaded();
});

Then(
  "debería ver el mensaje de error {string}",
  async function (this: CustomWorld, expectedMessage: string): Promise<void> {
    const currentMessage = await this.loginPage.getErrorMessage();
    assert.strictEqual(currentMessage, expectedMessage);
  }
);

When(
  "agrego el producto {string} al carrito",
  async function (this: CustomWorld, productName: string): Promise<void> {
    await this.inventoryPage.addProductToCartByName(productName);
  }
);

Then("el carrito debe mostrar {int} producto", async function (this: CustomWorld, count: number): Promise<void> {
  const currentCount = await this.inventoryPage.getCartBadgeCount();
  assert.strictEqual(currentCount, count);
});

When("abro el carrito", async function (this: CustomWorld): Promise<void> {
  await this.inventoryPage.openCart();
});

Then(
  "debo ver el producto {string} en el carrito",
  async function (this: CustomWorld, productName: string): Promise<void> {
    await this.cartPage.assertProductInCart(productName);
  }
);

When(
  "completo el checkout con nombre {string}, apellido {string} y código postal {string}",
  async function (
    this: CustomWorld,
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.cartPage.continueToCheckout();
    await this.checkoutPage.completeCustomerInformation(firstName, lastName, postalCode);
    await this.checkoutOverviewPage.finishCheckout();
  }
);

Then(
  "debo ver la confirmación {string}",
  async function (this: CustomWorld, expectedConfirmation: string): Promise<void> {
    const currentConfirmation = await this.checkoutCompletePage.getConfirmationMessage();
    assert.strictEqual(currentConfirmation, expectedConfirmation);
  }
);
