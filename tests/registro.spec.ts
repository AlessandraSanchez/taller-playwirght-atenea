import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';

let paginaRegistro: PaginaRegistro;

//Se ejecuta antes de cada test
test.beforeEach(async ({ page }) => {
   /*Usos comununes son:
  navegar a una pagina inicial del feature
  inicializar objetos de pagina
  configurar datos de prueba
  Autenticar usuario
  Limpiar cookies o almacenamiento local
  */
  paginaRegistro = new PaginaRegistro(page);
  await paginaRegistro.visitarPaginaRegistro();
})

test('TC1 - Verificación de elementos visuales en la página de registro', async ({ page }) => {
  await expect(paginaRegistro.firstNameInput).toBeVisible();
  await expect(paginaRegistro.lastNameInput).toBeVisible();
  await expect(paginaRegistro.emailInput).toBeVisible();
  await expect(paginaRegistro.passwordInput).toBeVisible();
  await expect(paginaRegistro.registerButton).toBeVisible();
  await expect(paginaRegistro.loginButton).toBeVisible();

});

test('TC2 - Verificar botón de registro esta inhabilitado por defecto', async ({ page }) => {
  await expect(paginaRegistro.registerButton).toBeDisabled();
  
});

test('TC3 - Verificar que el botón de registro se habilita al completar los campos obligatorios', async ({ page }) => {
  await paginaRegistro.completarFormularioRegistro('Alessandra', 'Sánchez', 'alessandra.sanchez@example.com', 'Contraseña123');
  await expect(paginaRegistro.registerButton).toBeEnabled();

});

test('TC4 - Verificar redireccionamiento a pagina de inicio de sesión al hacer clic en botón de inicio de sesión', async ({ page }) => {
  await paginaRegistro.irAPaginaLogin();
  await expect(page).toHaveURL('http://localhost:3000/login');
  await page.waitForTimeout(5000);
});

test('TC5 - registro exitoso, con datos validos ', async ({ page }) => {
  await paginaRegistro.registrarUsuario('Alessandra', 'Sánchez', 'alessandrasanchez' + Date.now().toString() + '@example.com', 'Contraseña123');  
  await expect(page.getByText('Registro exitoso')).toBeVisible();
});

test('TC6 - registro no exitoso, email existente ', async ({ page }) => {
  const email = 'alessandrasanchez' + Date.now().toString() + '@example.com';
  await paginaRegistro.registrarUsuario('Alessandra', 'Sánchez',email, 'Contraseña123');
  await expect(page.getByText('Registro exitoso')).toBeVisible();
  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario('Alessandra', 'Sánchez',email, 'Contraseña123');
  await expect(page.getByText('Email already in use')).toBeVisible();
  await expect(page.getByText('Registro exitoso')).not.toBeVisible();

});

