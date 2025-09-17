//importaciones de Playwright
import {Page, Locator, expect} from '@playwright/test';

export class PaginaLogin{
    
    readonly page:Page;
    //Definimos los localizadores que vamos a usar
    readonly tituloPage: Locator;  
    readonly emailInput: Locator;
    readonly contrasenaInput: Locator;
    readonly botonIniciarSesion: Locator;
    readonly LinkRegistrarse: Locator;
    readonly botonCrearCuenta: Locator;

     //Variables de mensajes
        readonly loginExitoso: string; 
        readonly loginFallido: string;


    //Constructor que recibe el page y define los localizadores
    constructor(page: Page){
        //Asignamos el page a la propiedad de la clase
        this.page = page;
        //Definimos el localizador para el campo de nombre
        this.tituloPage = page.getByTestId('titulo-login');
        this.emailInput= page.getByRole('textbox',{name: 'Correo electrónico'});
        this.contrasenaInput= page.getByRole('textbox',{name: 'Contraseña'});
        this.botonIniciarSesion= page.getByTestId('boton-login');
        this.LinkRegistrarse= page.getByTestId('link-registrarse-login')
        this.botonCrearCuenta= page.getByTestId('boton-Signup-header');
        this.loginExitoso= "Inicio de sesión exitoso";
        this.loginFallido= "Invalid credentials";
  
    }


    async visitarPaginaLogin() {
        await this.page.goto('http://localhost:3000/login');
        await this.page.waitForLoadState('domcontentloaded')
    }

    async completarFormularioLogin(email: string, contrasena: string){
        await this.emailInput.fill(email)
        await this.contrasenaInput.fill(contrasena)
    }

    async hacerclickBotonLogin(){
        await this.botonIniciarSesion.click()
    }

    async logueoExitoso(email: string, contrasena: string){
        await this.completarFormularioLogin(email,contrasena)
        await this.hacerclickBotonLogin();
        await expect(this.page.getByText(this.loginExitoso)).toBeVisible();

    
    }

    async logueoFallido(email: string, contrasena: string){
        await this.completarFormularioLogin(email,contrasena)
        await this.hacerclickBotonLogin();
        await expect(this.page.getByText(this.loginFallido)).toBeVisible();
    }
}       