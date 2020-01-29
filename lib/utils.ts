import 'reflect-metadata';
import { WebElementPromise } from "selenium-webdriver";
import * as util from "util";

export const delay: (ms: number) => Promise<unknown> = (ms: number): Promise<unknown> => {
  return new Promise((resolve: () => void): NodeJS.Timeout => setTimeout(resolve, ms));
};

export function findBy(selector: string): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string): void => {
    const type: any = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: function (): any {
        const promise: Promise<any> = this.browser.findElement(selector);

        return new type(promise, selector);
      },
    });
  };
}

export function findByXpath(selector: string, pattern: string | null | number = null): (target: any, propertyKey: string) => void {
  return (target: any, propertyKey: string): void => {
    const type: any = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: function (): any {
        const promise: WebElementPromise = pattern
          ? (this as any).browser.findByXpath( util.format(selector, pattern))
          : (this as any).browser.findByXpath(selector);

        return new type(promise, selector);
      },
    });
  };
}
