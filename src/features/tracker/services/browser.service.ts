import { Injectable } from '@nestjs/common';
import puppeteer, { Browser, Page } from 'puppeteer';
import { BrowserException } from '../models/browser.exception';
import { BROWSER_ERRORS } from '../constants/browser-errors';

@Injectable()
export class BrowserService {
  public openBrowser(): Promise<Browser> {
    return puppeteer.launch();
  }

  public getNewPage(browser: Browser): Promise<Page> {
    if (!browser) {
      return Promise.reject(
        new BrowserException(BROWSER_ERRORS.browserNotProvided),
      );
    }
    return browser.newPage();
  }

  public async navigate(page: Page, url: string): Promise<void> {
    if (!page || !url) {
      return Promise.reject(
        new BrowserException(BROWSER_ERRORS.pageNotProvided),
      );
    }
    await page.goto(url);
  }

  public async closeBrowser(browser: Browser): Promise<void> {
    if (!browser) {
      return Promise.reject(
        new BrowserException(BROWSER_ERRORS.browserNotProvided),
      );
    }
    await browser.close();
  }
}
