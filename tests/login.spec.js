const { test, expect } = require("@playwright/test");

const URL = "https://practicetestautomation.com/practice-test-login/";

test.describe("Pruebas de Login", () => {
  // PRUEBA 1: LOGIN EXITOSO
  // Tres assertions y esperas implícitas y explícitas

  test("Login exitoso", async ({ page }) => {
    await page.goto(URL);

    // ESPERA EXPLÍCITA:
    // Esperar hasta que el campo Username sea visible.
    await page.getByLabel("Username").waitFor({
      state: "visible",
    });

    // ESPERA IMPLÍCITA (AUTO-WAIT):
    // Playwright espera automáticamente que los elementos
    // estén disponibles antes de realizar estas acciones.
    await page.getByLabel("Username").fill("student");
    await page.getByLabel("Password").fill("Password123");

    await page.getByRole("button", { name: "Submit" }).click();

    // ESPERA EXPLÍCITA:
    // Esperar hasta que aparezca el enlace Log out.
    await page.getByRole("link", { name: "Log out" }).waitFor({
      state: "visible",
    });

    // TABLA DE ASSERTIONS: tres validaciones
    await expect(page).toHaveURL(/logged-in-successfully/);

    await expect(
      page.getByText(/Congratulations|successfully logged in/i),
    ).toBeVisible();

    await expect(page.getByRole("link", { name: "Log out" })).toBeVisible();
  });

  // PRUEBA 2: USUARIO INVÁLIDO

  test("Login con usuario inválido", async ({ page }) => {
    await page.goto(URL);

    await page.getByLabel("Username").fill("incorrectUser");
    await page.getByLabel("Password").fill("Password123");

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator("#error")).toBeVisible();

    await expect(page.locator("#error")).toHaveText(
      "Your username is invalid!",
    );
  });

  // PRUEBA 3: CONTRASEÑA INVÁLIDA

  test("Login con contraseña inválida", async ({ page }) => {
    await page.goto(URL);

    await page.getByLabel("Username").fill("student");
    await page.getByLabel("Password").fill("incorrectPassword");

    await page.getByRole("button", { name: "Submit" }).click();

    await expect(page.locator("#error")).toBeVisible();

    await expect(page.locator("#error")).toHaveText(
      "Your password is invalid!",
    );
  });
});
