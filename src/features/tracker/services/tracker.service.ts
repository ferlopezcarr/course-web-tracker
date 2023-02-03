import { Injectable } from '@nestjs/common';
import { BrowserService } from '../services/browser.service';

@Injectable()
export class TrackerService {
  private readonly CFTIC_WEB =
    'https://cftic.centrosdeformacion.empleo.madrid.org/calendario';

  constructor(private browserService: BrowserService) {}

  public getCfticEthInscriptionText(): Promise<string | null> {
    return this.browserService.openBrowser().then((browser) => {
      return this.browserService
        .getNewPage(browser)
        .then(async (page) => {
          await this.browserService.navigate(page, this.CFTIC_WEB);
          await page.waitForSelector('#emCookieBanner');
          const acceptCookiesButton = await page.waitForSelector(
            'a#emCookieBtnAccept',
          );
          await acceptCookiesButton?.click();
          await page.waitForSelector('text/FORMACIÓN EC COUNCIL');
          const tdInscription = await page.waitForSelector(
            '#cms-content-a40bad1b-705e-46c0-bdb3-474d2ab2bd53 > div > div > table:nth-child(26) > tbody > tr:nth-child(14)',
          );
          const tdInscriptionText = await tdInscription?.evaluate(
            (tdInscriptionState: any) => tdInscriptionState?.innerHTML,
          );
          return !!tdInscriptionText && tdInscriptionText !== ''
            ? tdInscriptionText
            : null;
        })
        .then((tdInscriptionText: any) => {
          return this.browserService.closeBrowser(browser).then(() => {
            return tdInscriptionText;
          });
        });
    });
  }

  public getCfticAwsInscriptionText(): Promise<string | null> {
    return this.browserService.openBrowser().then((browser) => {
      return this.browserService
        .getNewPage(browser)
        .then(async (page) => {
          await this.browserService.navigate(page, this.CFTIC_WEB);
          await page.waitForSelector('#emCookieBanner');
          const acceptCookiesButton = await page.waitForSelector(
            'a#emCookieBtnAccept',
          );
          await acceptCookiesButton?.click();
          await page.waitForSelector('text/FORMACIÓN AMAZON');
          const tdInscription = await page.waitForSelector(
            '#cms-content-a40bad1b-705e-46c0-bdb3-474d2ab2bd53 > div > div > table:nth-child(15) > tbody > tr:nth-child(6)',
          );
          const tdInscriptionText = await tdInscription?.evaluate(
            (tdInscriptionState: any) => tdInscriptionState?.innerHTML,
          );
          return !!tdInscriptionText && tdInscriptionText !== ''
            ? tdInscriptionText
            : null;
        })
        .then((tdInscriptionText: any) => {
          return this.browserService.closeBrowser(browser).then(() => {
            return tdInscriptionText;
          });
        });
    });
  }
}
