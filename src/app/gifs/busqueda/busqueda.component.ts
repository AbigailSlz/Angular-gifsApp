import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent  {

  //el signo (not null assertion operation) ! es para decirle a typescript que confiamos que esa variable no está vacia, es propio de typescript.
  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;


  constructor(private gifsService:GifsService){}

  buscar(){
    
    const valor = this.txtBuscar.nativeElement.value;

    if(valor.trim().length ===0){return;}
    
    this.gifsService.buscarGifs(valor);
    // console.log(valor);
     this.txtBuscar.nativeElement.value ="";
  }

}
