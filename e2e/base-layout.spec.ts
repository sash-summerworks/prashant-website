import { expect, test } from "@playwright/test";

test("Tailwind styles are loaded (skip link is visually hidden until focused)", async ({ page }) => {
  await page.goto("/");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  const hiddenWidth = await skipLink.evaluate((el) => el.getBoundingClientRect().width);
  expect(hiddenWidth).toBeLessThanOrEqual(1);

  await page.keyboard.press("Tab");
  await expect(skipLink).toBeFocused();
  const focusedWidth = await skipLink.evaluate((el) => el.getBoundingClientRect().width);
  expect(focusedWidth).toBeGreaterThan(1);
});
