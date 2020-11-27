import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window : scroll', ['$event'])
  onScroll(){

    //constante que guarda la posición del scroll
    const pos =  ( document.documentElement.scrollTop || document.body.scrollTop ) + 1300 ;

    // constante que guarda la posición máxima del scroll que puedo hacer o hasta el final de la página
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if( pos > max ){
      // LLamo el servicio
      
      if ( this.peliculasService.cargando ) { return; }

      this.peliculasService.getCartelera()
        .subscribe( movies => {
          this.movies.push(...movies );// incremento las movies insertandolas mediante el push usando dentro el spread para extraer todo lo que trae la respuesta y results.
        });// No hay que enviar ningún argumento porque todo está en el servicio.
    }

  
  }

  constructor( private peliculasService: PeliculasService ) {}


  ngOnInit(): void {

    this.peliculasService.getCartelera()
    .subscribe( movies =>{
      //console.log( resp.results );
      this.movies = movies;
      this.moviesSlideshow = movies;
    });
  }

  ngOnDestroy(){// Se ejecuta cuando el componente va a ser destruido o cuando se navega a otra ruta
    this.peliculasService.resetCarteleraPage();
  }

}
