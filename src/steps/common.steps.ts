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
