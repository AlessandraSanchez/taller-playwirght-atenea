import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';
import { PaginaDashboard } from '../pages/paginaDashboard';
import { ModalCrearCuenta } from '../pages/modalCrearCuenta';

let paginaLogin: PaginaLogin;
let paginaDashboard: PaginaDashboard;
let modalCrearCuenta: ModalCrearCuenta;

test('TC5 - Verificar que el usuario pueda crear una cuenta exitosamente ', async ({ page }) => {
  
  paginaLogin= new PaginaLogin(page);
  paginaDashboard= new PaginaDashboard(page); 
  modalCrearCuenta= new ModalCrearCuenta(page);
  await paginaLogin.visitarPaginaLogin();
  await paginaLogin.logueoExitoso("Alessandra.Sanchez704@example.com","Contraseña123");
  await paginaDashboard.botonAgregarCuenta.click();
  await modalCrearCuenta.tipoDeCuentaCombo.click();
  await modalCrearCuenta.opcionDebito.click();
  await modalCrearCuenta.montoInicialInput.fill("150");
  await modalCrearCuenta.botonCrearCuenta.click();
  await page.waitForTimeout(5000);

})