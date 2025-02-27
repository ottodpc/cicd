import { test, expect, Page } from "@playwright/test";

test.describe("Register Page", () => {
  let page: Page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto("/register");
  });

  test("should display register form", async () => {
    await expect(page.locator("data-testid=register-page")).toBeVisible();
    await expect(page.locator("data-testid=register-form")).toBeVisible();
    await expect(page.locator("data-testid=username-input")).toBeVisible();
    await expect(page.locator("data-testid=password-input")).toBeVisible();
    await expect(
      page.locator("data-testid=confirm-password-input")
    ).toBeVisible();
    await expect(page.locator("data-testid=register-button")).toBeVisible();
  });

  // test("should show validation errors with empty fields", async () => {
  //   await page.locator("data-testid=register-button").click();

  //   // Check for validation errors
  //   const usernameError = page.locator("text=Le nom d'utilisateur est requis");
  //   const passwordError = page.locator("text=Le mot de passe est requis");

  //   await expect(usernameError).toBeVisible();
  //   await expect(passwordError).toBeVisible();
  // });

  // test("should show error when passwords do not match", async () => {
  //   await page.locator("data-testid=username-input").fill("newuser");
  //   await page.locator("data-testid=password-input").fill("password123");
  //   await page
  //     .locator("data-testid=confirm-password-input")
  //     .fill("differentpassword");
  //   await page.locator("data-testid=register-button").click();

  //   const passwordError = page.locator(
  //     "text=Les mots de passe ne correspondent pas"
  //   );
  //   await expect(passwordError).toBeVisible();
  // });

  // test("should navigate to login page", async () => {
  //   await page.click("text=connectez-vous à votre compte");
  //   await expect(page).toHaveURL("/login");
  // });

  // test("should register successfully", async () => {
  //   // Mock successful API response
  //   await page.route("**/v1/users", async (route) => {
  //     await route.fulfill({
  //       status: 200,
  //       contentType: "application/json",
  //       body: JSON.stringify({
  //         userId: "1234",
  //         username: "newuser",
  //         todos: [],
  //       }),
  //     });
  //   });

  //   await page.locator("data-testid=username-input").fill("newuser");
  //   await page.locator("data-testid=password-input").fill("password123");
  //   await page
  //     .locator("data-testid=confirm-password-input")
  //     .fill("password123");
  //   await page.locator("data-testid=register-button").click();

  //   // Should redirect to login page
  //   await expect(page).toHaveURL("/login");
  // });

  // test("should show error on registration failure", async () => {
  //   // Mock unsuccessful registration
  //   await page.route("**/v1/users", async (route) => {
  //     await route.fulfill({
  //       status: 400,
  //       contentType: "application/json",
  //       body: JSON.stringify({
  //         message: "Nom d'utilisateur déjà pris",
  //       }),
  //     });
  //   });

  //   await page.locator("data-testid=username-input").fill("existinguser");
  //   await page.locator("data-testid=password-input").fill("password123");
  //   await page
  //     .locator("data-testid=confirm-password-input")
  //     .fill("password123");
  //   await page.locator("data-testid=register-button").click();

  //   // Should display error message
  //   await expect(page.locator("data-testid=register-error")).toBeVisible();
  // });
});
