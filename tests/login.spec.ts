import { test, expect } from '@playwright/test';
import { PaginaLogin } from '../pages/paginaLogin';

let paginaLogin: PaginaLogin

//Se ejecuta antes de cada test
test.beforeEach(async ({ page }) => {
    paginaLogin= new PaginaLogin(page);
    await paginaLogin.visitarPaginaLogin();
})

test('TC4 - login exitoso ', async ({ page }) => {
  
await paginaLogin.logueoExitoso("Alessandra.Sanchez704@example.com","Contraseña123");
await page.waitForTimeout(5000);  
});


