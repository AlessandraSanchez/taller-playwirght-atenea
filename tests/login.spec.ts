import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';

let paginaLogin: PaginaLogin

test('TC4 - login exitoso ', async ({ page }) => {
  
paginaLogin= new PaginaLogin(page);
await paginaLogin.visitarPaginaLogin();
await paginaLogin.logueoExitoso("Alessandra.Sanchez704@example.com","Contraseña123");
await page.waitForTimeout(5000);  
});


