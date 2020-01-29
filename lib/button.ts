import { WebElementPromise } from 'selenium-webdriver';
import { WebComponent } from './web-component';

export class Button extends WebComponent {
  constructor(element: WebElementPromise, selector: string) {
    super(element, selector);
  }

  public async isDisabled(): Promise<boolean> {
    try {
      return await this.element.getAttribute('disabled') === 'disabled';
    } catch (ex) {
      return false;
    }
  }
}
