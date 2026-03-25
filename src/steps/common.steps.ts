import { Given, Then, When } from "@cucumber/cucumber";
import type { DataTable } from "@cucumber/cucumber";
import assert from "node:assert";
import type { CustomWorld } from "../types/customWorld";

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
    this.lastAddedProductName = productName;
  }
);

Then("el carrito debe mostrar {int} producto", async function (this: CustomWorld, count: number): Promise<void> {
  const currentCount = await this.inventoryPage.getCartBadgeCount();
  assert.strictEqual(currentCount, count);
});

Then("el carrito refleja el producto agregado", async function (this: CustomWorld): Promise<void> {
  const currentCount = await this.inventoryPage.getCartBadgeCount();
  assert.ok(currentCount > 0, "Se esperaba al menos 1 producto en el carrito");
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

When("completo el checkout con:", async function (this: CustomWorld, table: DataTable): Promise<void> {
  const [row] = table.hashes() as Array<Record<string, string>>;
  assert.ok(row, "La tabla de checkout debe tener una fila con datos");

  const firstName = row.firstName;
  const lastName = row.lastName;
  const postalCode = row.postalCode;

  assert.ok(firstName, "firstName es obligatorio");
  assert.ok(lastName, "lastName es obligatorio");
  assert.ok(postalCode, "postalCode es obligatorio");

  await this.cartPage.continueToCheckout();
  await this.checkoutPage.completeCustomerInformation(firstName, lastName, postalCode);
  await this.checkoutOverviewPage.finishCheckout();
});

Then(
  "debo ver la confirmación {string}",
  async function (this: CustomWorld, expectedConfirmation: string): Promise<void> {
    const currentConfirmation = await this.checkoutCompletePage.getConfirmationMessage();
    assert.strictEqual(currentConfirmation, expectedConfirmation);
  }
);
