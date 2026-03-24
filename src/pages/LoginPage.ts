import { testConfig } from "../config/testConfig";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  private readonly usernameInput = this.page.locator("#user-name");
  private readonly passwordInput = this.page.locator("#password");
  private readonly loginButton = this.page.locator("#login-button");
  private readonly errorMessage = this.byTestId("error");

  public async visit(): Promise<void> {
    await this.page.goto(testConfig.baseUrl, { waitUntil: "domcontentloaded" });
    await this.expectVisible(this.loginButton);
  }

  public async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  public async loginAs(username: string): Promise<void> {
    await this.login(username, testConfig.defaultPassword);
  }

  public async getErrorMessage(): Promise<string> {
    await this.expectVisible(this.errorMessage);
    const text = await this.errorMessage.textContent();
    return (text ?? "").trim();
  }
}
