import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { beforeEach, describe, expect, it } from "vitest";
import BaseLayout from "./BaseLayout.astro";

const props = {
  title: "Work",
  description: "Prashant Rajkhowa’s work across TV, writing and tech.",
};

describe("BaseLayout", () => {
  let container: AstroContainer;

  beforeEach(async () => {
    container = await AstroContainer.create();
  });

  it("sets the document language and viewport", async () => {
    const html = await container.renderToString(BaseLayout, { props });
    expect(html).toContain('<html lang="en"');
    expect(html).toMatch(/<meta name="viewport" content="width=device-width, initial-scale=1"/);
  });

  it("puts the page title before the site name in <title>", async () => {
    const html = await container.renderToString(BaseLayout, { props });
    expect(html).toContain("<title>Work | Prashant Rajkhowa</title>");
  });

  it("uses just the site name as <title> when the page title is the site name", async () => {
    const html = await container.renderToString(BaseLayout, {
      props: { ...props, title: "Prashant Rajkhowa" },
    });
    expect(html).toContain("<title>Prashant Rajkhowa</title>");
  });

  it("renders the meta description", async () => {
    const html = await container.renderToString(BaseLayout, { props });
    expect(html).toContain(`<meta name="description" content="${props.description}"`);
  });

  it("renders page content inside <main id=\"main\">", async () => {
    const html = await container.renderToString(BaseLayout, {
      props,
      slots: { default: "<p>Page body</p>" },
    });
    expect(html).toMatch(/<main id="main"[^>]*>[\s\S]*<p>Page body<\/p>[\s\S]*<\/main>/);
  });

  it("offers a skip link to the main content as the first focusable element", async () => {
    const html = await container.renderToString(BaseLayout, { props });
    const body = html.slice(html.indexOf("<body"));
    const firstLink = body.match(/<a [^>]*>[^<]*<\/a>/)?.[0] ?? "";
    expect(firstLink).toContain('href="#main"');
    expect(firstLink).toContain("Skip to content");
  });

  it("shows the site name in the header, linking home", async () => {
    const html = await container.renderToString(BaseLayout, { props });
    expect(html).toMatch(/<header[\s\S]*<a [^>]*href="\/"[^>]*>Prashant Rajkhowa<\/a>[\s\S]*<\/header>/);
  });

  it("shows a copyright line with the current year in the footer", async () => {
    const html = await container.renderToString(BaseLayout, { props });
    const year = new Date().getFullYear();
    expect(html).toMatch(new RegExp(`<footer[\\s\\S]*© ${year} Prashant Rajkhowa[\\s\\S]*</footer>`));
  });
});
