import { chromium, Browser, BrowserContext, Page } from 'playwright';

export class BrowserService {
  private static instance: BrowserService;
  private browser: Browser | null = null;
  private context: BrowserContext | null = null;
  private page: Page | null = null;

  private constructor() {}

  public static getInstance(): BrowserService {
    if (!BrowserService.instance) {
      BrowserService.instance = new BrowserService();
    }
    return BrowserService.instance;
  }

  public async getPage(): Promise<Page> {
    if (!this.browser) {
      this.browser = await chromium.launch({ headless: true });
    }
    if (!this.context) {
      this.context = await this.browser.newContext({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36'
      });
    }
    if (!this.page) {
      this.page = await this.context.newPage();
    }
    return this.page;
  }

  public async close(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }
    if (this.context) {
      await this.context.close();
      this.context = null;
    }
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }
  }

  public async navigate(url: string): Promise<void> {
    const page = await this.getPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
  }

  public async click(selector: string): Promise<void> {
    const page = await this.getPage();
    await page.click(selector, { timeout: 10000 });
  }

  public async type(selector: string, text: string): Promise<void> {
    const page = await this.getPage();
    await page.fill(selector, text, { timeout: 10000 });
  }

  public async getContent(): Promise<string> {
    const page = await this.getPage();
    return await page.content();
  }
}

export const browserService = BrowserService.getInstance();
