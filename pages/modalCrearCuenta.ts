//importaciones de Playwright
import {Page, Locator, expect} from '@playwright/test';

export class ModalCrearCuenta{
    
    readonly page:Page;
    //Definimos los localizadores que vamos a usar 
    readonly tipoDeCuentaCombo: Locator;
    readonly opcionDebito: Locator;
    readonly montoInicialInput: Locator;
    readonly botonCrearCuenta: Locator;

     //Variables de mensajes
        readonly cuentaCreadaExitosamente: string;

    //Constructor que recibe el page y define los localizadores
    constructor(page: Page){
        //Asignamos el page a la propiedad de la clase
        this.page = page;
        this.tipoDeCuentaCombo = this.page.getByRole('combobox', { name: 'Tipo de cuenta *' })
        this.opcionDebito= this.page.getByRole('option', { name: 'Débito' });
        this.montoInicialInput=this.page.getByRole('spinbutton', { name: 'Monto inicial *' })
        this.botonCrearCuenta= this.page.getByTestId('boton-crear-cuenta')
    }



}