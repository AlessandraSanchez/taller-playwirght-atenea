//importaciones de Playwright
import {Page, Locator} from '@playwright/test';

//exponiendo la clase PaginaRegistro para poder usarla en los test
export class PaginaRegistro{
    // Siempre necesitamos el page para interactuar con la pagina
    readonly page: Page;
    // Definimos los localizadores que vamos a usar
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator; 
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly registerButton: Locator;
    readonly loginButton: Locator;

    //Variables de texto para mensajes
    readonly mensajeDeCreacionDeCuenta: string;
    readonly mensajeEmailUtilizado: string;
    
    //Constructor que recibe el page y define los localizadores
    constructor(page: Page){
        //Asignamos el page a la propiedad de la clase
        this.page = page;
        //Definimos el localizador para el campo de nombre
        this.firstNameInput = page.getByRole('textbox',{name: 'Nombre'});
        this.lastNameInput = page.locator('[name="lastName"]');
        this.emailInput= page.getByRole('textbox',{name: 'Correo electrónico'});
        this.passwordInput= page.getByRole('textbox',{name: 'Contraseña'});
        this.registerButton= page.getByTestId('boton-registrarse');
        this.loginButton= page.getByTestId('boton-login-header-signup');
        //variables de texto
        this.mensajeDeCreacionDeCuenta= "Registro exitoso!"
        this.mensajeEmailUtilizado= "Email already in use";

    }

    async visitarPaginaRegistro() {
        await this.page.goto('http://localhost:3000/signup');
        await this.page.waitForLoadState('networkidle');
    }

    async completarFormularioRegistro(nombre: string, apellido: string, email: string, contrasena: string) {
        await this.firstNameInput.fill(nombre);
        await this.lastNameInput.fill(apellido);
        await this.emailInput.fill(email);
        await this.passwordInput.fill(contrasena);
    }

    async hacerClickEnBotonRegistro() {
        await this.registerButton.click();
    }

    async registrarUsuario(nombre: string, apellido: string, email: string, contrasena: string) {
        await this.completarFormularioRegistro(nombre, apellido, email, contrasena);
        await this.hacerClickEnBotonRegistro();
    }

    async irAPaginaLogin() {
        await this.loginButton.click();
    }
    
}