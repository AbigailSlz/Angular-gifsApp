import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

//provideIn permite que los servicios puedan estar definidos en el inicio del proyecto, es unico y de manera global en el root.
@Injectable({
  providedIn: 'root' 
})
export class GifsService {

  private apiKey      : string   = "mznlY49HBoy9y2TgL1zIJCuW4F8AGmdi";
  private servicioUrl : string   = 'https://api.giphy.com/v1/gifs';
  private _historial  : string[] = [];

  public resultados: Gif[]=[];

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient){
   
   this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
   this.resultados = JSON.parse(localStorage.getItem('historial_resultados')!) || [];


    // if(localStorage.getItem('historial')){ 
    //   this._historial = JSON.parse( localStorage.getItem('historial')! );
    // }
  }
  
  buscarGifs(query: string = ''){
    
    query = query.trim().toLowerCase();
    
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      //grabar en el local storage
      localStorage.setItem('historial', JSON.stringify(this._historial));
  
    }

    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('limit','10')
          .set('q',query);

    
    //tipo generico

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{ params })
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('historial_resultados', JSON.stringify(this.resultados));
    });

    //console.log(this._historial);
  }
}


 // fetch('https://api.giphy.com/v1/gifs/search?api_key=mznlY49HBoy9y2TgL1zIJCuW4F8AGmdi&q=sailor moon&limit=10')
    // .then(resp => {
    //     resp.json().then(data => console.log(data))
    // })
