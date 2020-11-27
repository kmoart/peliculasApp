import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { PeliculasService } from '../../services/peliculas.service';
import { MovieResponse } from '../../interfaces/movie-response';
import { Cast } from '../../interfaces/credits-response';
import { combineLatest } from 'rxjs';



@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public pelicula: MovieResponse;
  public cast: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
                private peliculasService: PeliculasService,
                private location: Location,
                private router: Router ) { }

  ngOnInit(): void {

   // const id = this.activatedRoute.snapshot.params.id;
      const { id } = this.activatedRoute.snapshot.params; // Se utiliza el formato desestructuración que sirve para el caso de que hayan más datos que deseamos obtener, no solo el id.

      combineLatest([ //combineLatest recibe una cantidad x de observables y regresa un objeto que en realidad es un arreglo con todas las respuestas de los observables cuando ya han emitido por lo menos un valor todos ellos
        this.peliculasService.getPeliculaDetalle( id ),
        this.peliculasService.getCast( id )

      ]).subscribe( ([pelicula, cast]) => { //Con desestructuración de arreglos recibimos los valores de la película en pelicula y los valor de los actores en cast.
        
        if( !pelicula ){// se pregunta si es null no realice nada o vuelva a la lista de películas o al home, etc
          this.router.navigateByUrl('/home');
          return;
        }

        this.pelicula = pelicula;        
        this.cast = cast.filter( actor => actor.profile_path !== null );// El filter regresa un nuevo arreglo donde no se tienen en cuenta los actores que tengan una imagen nula 
        
      });


      //this.peliculasService.getPeliculaDetalle( id ).subscribe( movie => {
        //if( !movie ){// se pregunta si es null no realice nada o vuelva a la lista de películas o al home, etc
          //this.router.navigateByUrl('/home');
          //return;
        //}

        //console.log( movie );
        //this.pelicula = movie;
      //});

      //this.peliculasService.getCast( id ).subscribe( cast => {
        //console.log( cast );
        //this.cast = cast.filter( actor => actor.profile_path !== null );// El filter regresa un nuevo arreglo donde no se tienen en cuenta los actores que tengan una imagen nula 
     // });
  }

  onRegresar(){
    this.location.back();
  }

}
