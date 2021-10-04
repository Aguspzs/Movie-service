import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  @Input ('peliculas') peliculas;

  @Input ('titulo') titulo;

  @Input ('idCarousel') idCarousel;

   n: number;



  constructor( ) {
      this.changeBanner();
  }


  ngOnInit(): void {
  }

  changeBanner(){
    this.n = 19 + Math.floor((0 - 19) * Math.random());

  }

  getClass(titulo){
    if(titulo.length <= 6){
       return 'sm-title';
    }
    if(titulo.length <= 18){
      return'md-title';
    }
    if(titulo.length > 18){
      return 'lg-title';
    }
  }



}
