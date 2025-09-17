import { test, expect } from '@playwright/test';
import { PaginaRegistro } from '../pages/paginaRegistro';

let paginaRegistro: PaginaRegistro;

test('TC1 - registro exitoso ', async ({ page }) => {
  paginaRegistro= new PaginaRegistro(page);
const emailAleatorio= 'Alessandra.Sanchez'+ Math.floor(Math.random()*1000)+ '@example.com';

  await paginaRegistro.visitarPaginaRegistro();
  await paginaRegistro.registrarUsuario(
    "Alessandra",
    "Sánchez", 
    emailAleatorio, 
    "Contraseña123");
  await expect(page.getByText(paginaRegistro.mensajeDeCreacionDeCuenta)).toBeVisible();
});

test('TC2 - registro no exitoso, email existente ', async ({ page }) => {
  paginaRegistro= new PaginaRegistro(page);
  await paginaRegistro.visitarPaginaRegistro();

  await paginaRegistro.registrarUsuario(
    "Alessandra",
     "Sánchez", 
     "alessandra.sanchez@example.com", 
     "Contraseña123");
  await expect(page.getByText(paginaRegistro.mensajeEmailUtilizado)).toBeVisible();
});

test('TC3 - verificar redireccionamiento a login despues de crear un usuario', async ({ page }) => {

  paginaRegistro= new PaginaRegistro(page);
  const  emailAleatorio= 'Alessandra.Sanchez'+ Math.floor(Math.random()*1000)+ '@example.com';
  await paginaRegistro.visitarPaginaRegistro();

  await paginaRegistro.registrarUsuario(
    "Alessandra",
     "Sánchez", 
     emailAleatorio, 
     "Contraseña123");

  await expect(page.getByText(paginaRegistro.mensajeDeCreacionDeCuenta)).toBeVisible();
  await page.waitForURL('http://localhost:3000/login')
  await page.waitForTimeout(5000);
});
