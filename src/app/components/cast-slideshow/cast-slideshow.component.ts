import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Cast } from '../../interfaces/credits-response';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-cast-slideshow',
  templateUrl: './cast-slideshow.component.html',
  styleUrls: ['./cast-slideshow.component.css']
})
export class CastSlideshowComponent implements OnInit, AfterViewInit {

  @Input() cast: Cast[] = [];

  constructor() { }

  ngOnInit(): void {
    //console.log( this.cast );
  }

  ngAfterViewInit(){
    const swiper = new Swiper('.swiper-container', {
        slidesPerView: 5.3, // Se mostrarán 5.3 slides
        freeMode: true, // para que no tenga esos clicks cuando se éste moviendo el slider, que se más "fluido".
        spaceBetween: 15
    })//Se obtiene la clase .swiper-container para instanciar el objeto swiper ahí.

  }

}
