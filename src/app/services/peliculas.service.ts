import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'; // El tap es parecido al map y otros usados antes, con la diferencia que el tap dispara un efecto secundario 
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando: boolean = false;
  

  constructor( private http: HttpClient ) { }

  get params(){
    return{
      api_key: 'dab10117e88725478effa1d035b08c74',
      language: 'en-US',
      page: this.carteleraPage.toString()
    }
  }

  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getCartelera(): Observable<Movie[]> {

    if ( this.cargando ){
      // cargando películas
      return of([]);// Se retorna un observable que emite un arreglo. El of transforma un observable que emite lo que esté dentro del paréntesis. En este caso un arreglo vacío.
    }

    this.cargando = true;

     return this.http.get<CarteleraResponse>(`${ this.baseUrl }/movie/now_playing`, {
       params: this.params
     }).pipe(
       map( (resp) => resp.results ),
       tap( () =>{
         this.carteleraPage +=1;// incrementa el valor de la página de la cartelera para que el servicio llame la siguuiente página
         this.cargando = false; // Se termina de cargar 
       })
     );
  }

  buscarPeliculas( texto: string ): Observable<Movie[]>{
      const params = {...this.params, page: '1', query: texto };

      //https://api.themoviedb.org/3/search/movie
      return this.http.get<CarteleraResponse>(`${ this.baseUrl }/search/movie`,{
        params: params
      }).pipe(
        map( resp => resp.results )
      )
  }

  getPeliculaDetalle( id: string ){

    return this.http.get<MovieResponse>(`${ this.baseUrl}/movie/${ id }`, {
      params: this.params
    }).pipe(
      catchError( err => of( null ) ) // of es una función para generar observables
    )

  }

  getCast( id: string ): Observable<Cast[]>{//Se devuelve un observable emite un arreglo de tipo Cast

    return this.http.get<CreditsResponse>(`${ this.baseUrl}/movie/${ id }/credits`, {
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of( [] ) )// se regresa un arreglo vacío cuando no encuentre datos en el arreglo cast o arreglo de actores
    );
  }
}
