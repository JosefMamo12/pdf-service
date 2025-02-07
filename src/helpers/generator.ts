import puppeteer, { Browser } from "puppeteer";
import chromium from "@sparticuz/chromium";

type OptionsType = {
  paperFormat?: string;
  printBackground?: boolean;
  path?: string;
  margin?:
    | {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
      }
    | undefined;
};

const defaultOptions: OptionsType = {
  paperFormat: "A4",
  printBackground: true,
  path: "output.pdf",
  margin: undefined,
};
async function getBrowser(): Promise<Browser> {
  return puppeteer.launch({
    args: ["--no-sandbox"],
    headless: chromium.headless,
  }) as unknown as Browser;
}
async function htmlToPdf(
  browser: Browser,
  html: string,
  options: OptionsType = defaultOptions
): Promise<Buffer> {
  const page = await browser.newPage();

  // The setContent method is used to set the HTML content of the page.
  await page.setContent(html);

  // The options object is passed to the pdf method to configure the PDF output.
  const pdfBuffer = await page.pdf(options);

  // Close the browser after the PDF is generated.
  await browser.close();

  return Buffer.from(pdfBuffer);
}
export async function main(
  html: string,
  options: OptionsType = defaultOptions
) {
  const browser = await getBrowser();
  const pdf = await htmlToPdf(browser, html, options);
  return pdf;
}
