import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { IWorldOptions } from "@cucumber/cucumber";
import { chromium } from "playwright";
import type { Browser, BrowserContext, Page } from "playwright";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";
import { CheckoutCompletePage } from "../pages/CheckoutCompletePage";
import { testConfig } from "../config/testConfig";

export class CustomWorld extends World {
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;
  public lastAddedProductName?: string;

  public loginPage!: LoginPage;
  public inventoryPage!: InventoryPage;
  public cartPage!: CartPage;
  public checkoutPage!: CheckoutPage;
  public checkoutOverviewPage!: CheckoutOverviewPage;
  public checkoutCompletePage!: CheckoutCompletePage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  public async init(): Promise<void> {
    this.browser = await chromium.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-gpu"]
    });
    this.context = await this.browser.newContext({
      recordVideo: { dir: testConfig.paths.videosDir, size: { width: 1280, height: 720 } },
      viewport: { width: 1280, height: 720 }
    });
    this.page = await this.context.newPage();
    this.page.setDefaultNavigationTimeout(testConfig.timeouts.navigationTimeoutMs);

    this.loginPage = new LoginPage(this.page);
    this.inventoryPage = new InventoryPage(this.page);
    this.cartPage = new CartPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
    this.checkoutCompletePage = new CheckoutCompletePage(this.page);
  }
}

setWorldConstructor(CustomWorld);
