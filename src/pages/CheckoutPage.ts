import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  private readonly firstNameInput = this.byTestId("firstName");
  private readonly lastNameInput = this.byTestId("lastName");
  private readonly postalCodeInput = this.byTestId("postalCode");
  private readonly continueButton = this.byTestId("continue");

  public async completeCustomerInformation(
    firstName: string,
    lastName: string,
    postalCode: string
  ): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }
}
