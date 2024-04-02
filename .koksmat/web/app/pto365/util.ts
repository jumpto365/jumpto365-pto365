import * as cheerio from "cheerio";

export function innerText(tag: string, html: string | undefined): string {
  if (!html) {
    return "";
  }

  const $ = cheerio.load(html);
  const zz = $("*").find(tag);
  if (zz.length === 0) {
    return "";
  }
  const t = $(zz[0]).text();
  return t;
}

export function fixHtml(html: string | undefined): string {
  if (!html) {
    return "";
  }

  html = html.replaceAll(`class="fontSizeMega"`, `style="font-size: 68px"`);
  html = html.replaceAll(
    `class="fontSizeXxLargePlus"`,
    `style="font-size: 36px"`
  );

  html = html.replaceAll(`class="fontSizeSuper"`, `style="font-size: 32px"`);
  html = html.replaceAll(`class="fontSizeXxxLarge"`, `style="font-size: 32px"`);
  html = html.replaceAll(`class="fontSizeXxLarge"`, `style="font-size: 28px"`);
  html = html.replaceAll(
    `class="fontSizeXLargePlus"`,
    `style="font-size: 24px"`
  );

  const $ = cheerio.load(html);

  const x = $("*").find(".imagePlugin");
  // data-imageurl
  if (x.length > 0) {
    x.each((i, el) => {
      const imageUrl = $(el).attr("data-imageurl");
      const imageWidth = $(el).attr("data-widthpercentage");

      $(el).replaceWith(
        `<img style="margin-left:auto;margin-right:auto;  width:${imageWidth}%" src="${imageUrl}" />`
      );
    });
  }

  return $.html();
}
