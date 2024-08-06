import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchResponse, Gif} from '../interfaces/gifs.interfaces';


@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string [] = [];
  private _APIKEY : string = 'CsD8zHkmPpjnWkO4OG4xdhiReoTazxDp';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  public gifList: Gif[]=[];

  constructor(private http:HttpClient) {
    this.loadLocalStorage();
    console.log('Gifs Service Ready')
  }

  get tagsHistory(){
    return [...this._tagsHistory];
  }

  //Metodo organizeHistory()
  //sirve para organizar el historial
  private organizeHistory(tag: string){
    tag = tag.toLowerCase();

    //Includes busca un tag existente
    if(this._tagsHistory.includes(tag)){
      //Filter remueve el tag la lista existente
      this._tagsHistory = this._tagsHistory.filter(oldtag => oldtag !== tag )
    }

    //unshift inserta el tag
    this._tagsHistory.unshift(tag);
    //Splice ordena el tag de 10 elementos
    this._tagsHistory = this.tagsHistory.splice(0,10);

    this.saveLocalStorage();
  }

  //Metodo saveLocalStorage()
  // sirve para almacenar el hisotrial de busqueda en el navegador donde tiene 50mb de almacenamiento
  private saveLocalStorage():void{
    localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage(): void{
    if( !localStorage.getItem('history')) return;
    this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

    //Permite tomar la primera busqueda de nuestro search tag
    if ( this._tagsHistory.length === 0 ) return;
    this.searchTag(this._tagsHistory[0])
  }

  async searchTag( tag: string): Promise<void>{
    if (tag.length === 0) return ;
    this.organizeHistory(tag);


    //Utilizar HttpParams para utilizar parametros del Jaso
    const params = new HttpParams()
     .set('api_key', this._APIKEY)
     .set('q', tag)
     .set('limit', '10')
     ;


    this.http.get<SearchResponse>( `${this.serviceUrl}/search`, {params})
     .subscribe(response => {
      this.gifList = response.data;
    });

  }

}
