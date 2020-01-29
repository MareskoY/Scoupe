import { Browser } from '../lib';
import { LoginPage, SwitcherProfilePage } from '../tests/pages';
import { HomePage } from "./home";
import { ShopItems, ShopPage } from "./shop";
import { ThemesPage } from "./themes";

export class AllPages {
  public login: LoginPage;
  public switchProfile: SwitcherProfilePage;
  public homePage: HomePage;
  public shopPage: ShopPage;
  public themesPage: ThemesPage;

  constructor(public browser: Browser) {
    this.login = new LoginPage(browser);
    this.switchProfile = new SwitcherProfilePage(browser);
    this.homePage = new HomePage(browser);
    this.shopPage = new ShopPage(browser);
    this.themesPage = new ThemesPage(browser);
  }

  public async goToTheme(): Promise<void> {
    await this.login.signIn();
    await this.switchProfile.clickOnLogo();
    await this.homePage.clickOnApps();
    await this.shopPage.select(ShopItems.SHOP);
    await this.themesPage.clickOnThemes();
    await this.themesPage.clickOnMyThemes();
    await this.themesPage.clickOnAddThemes();
  }
}
