import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnChanges {

  @Input ('peliculas') peliculas;

  @Input ('titulo') titulo;

  @Input ('idCarousel') idCarousel;
  
  @Input ('title') title:boolean = false;

  @Input ('text') text:boolean = false;


  constructor( private router: Router ) {
   }

  ngOnChanges(): void {
    const carousel = document.getElementById(this.idCarousel);
    if(carousel){
      if(carousel.scrollLeft !== 0){
        carousel.scrollLeft = 0;
      }
    }

  }

  goRight(id:string){
    const carousel = <HTMLElement> document.querySelector(`#${id}`);
    carousel.scrollLeft += carousel.offsetWidth;
  }

  goLeft(id:string){
    const carousel = <HTMLElement> document.querySelector(`#${id}`);
    carousel.scrollLeft -= carousel.offsetWidth;
  }

  redirect( id:string ){
  if(this.text){
    return;
  }
    this.router.navigate(['/movie', id]);
  }

}
