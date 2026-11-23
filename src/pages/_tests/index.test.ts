import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import IndexPage from "../index.astro";

describe("home page", () => {
  it("uses the base layout, titled with just the site name", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(IndexPage);
    expect(html).toContain("<title>Prashant Rajkhowa</title>");
    expect(html).toContain('<main id="main"');
  });

  it("has a single top-level heading", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(IndexPage);
    expect(html.match(/<h1[\s>]/g)).toHaveLength(1);
  });
});
