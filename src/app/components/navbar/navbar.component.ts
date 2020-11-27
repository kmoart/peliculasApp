import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router:Router ) { }

  ngOnInit(): void {
  }

  buscarPelicula( texto: string ){

    texto = texto.trim();// Para borrar los espacios

    if ( texto.length === 0){// Si la longitud de texto es igual a cero no hace nada
      return;
    }

    this.router.navigate(['/buscar', texto ]);

      console.log(texto);

  }

}
