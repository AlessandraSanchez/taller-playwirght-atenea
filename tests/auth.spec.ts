import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin'; 
import { PaginaDashboard } from '../pages/paginaDashboard';
import { ModalCrearCuenta } from '../pages/modalCrearCuenta';


let paginaLogin: PaginaLogin;
let paginaDashboard: PaginaDashboard;
let modalCrearCuenta: ModalCrearCuenta;

test('CP-1 Login Exitoso y Redirección al Dashboard' , async ({ page }) => {
  
  paginaLogin= new PaginaLogin(page);
  paginaDashboard= new PaginaDashboard(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.logueoExitoso("Alessandra.Sanchez704@example.com","Contraseña123");
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(paginaDashboard.tituloDashboard).toBeVisible();

});

test('CP-2 Intento de login con credenciales inválidas' , async ({ page }) => {

  paginaLogin= new PaginaLogin(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.logueoFallido("Alessandra.Sanchez704@example.com","ContraseñaIncorrecta");
  await page.waitForTimeout(5000);

});

test('CP-3 Intento de Login con Campos Vacíos' , async ({ page }) => {

  paginaLogin= new PaginaLogin(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.hacerclickBotonLogin();
  const emailInput = page.locator('input[type="email"]');
  const validationMessage = await emailInput.evaluate(el => (el as HTMLInputElement).validationMessage);
  
  console.log(validationMessage); // Muestra el mensaje nativo del navegador
  expect(validationMessage).toBe('Please fill out this field.');

// También puedes verificar que la URL no cambió
await expect(page).toHaveURL(/login/);
});

test('CP-4 Intento de Login con Email sin Contraseña' , async ({ page }) => {       
    paginaLogin= new PaginaLogin(page);
    await paginaLogin.visitarPaginaLogin();
    await paginaLogin.completarFormularioLogin("Alessandra.Sanchez704@example.com", "");
    await paginaLogin.hacerclickBotonLogin();
    await page.waitForTimeout(5000);
    const contrasenaInput = page.locator('input[type="password"]');

    // Mensaje nativo
    await expect(paginaLogin.contrasenaInput).toHaveJSProperty('validationMessage', 'Please fill out this field.');

    // También puedes verificar que la URL no cambió
    await expect(page).toHaveURL('http://localhost:3000/login');
    });


