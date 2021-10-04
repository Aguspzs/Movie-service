import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Movie } from 'src/app/interfaces/cartelera-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { StarRatingComponent } from 'ng-starrating';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  pelicula: MovieResponse;
  
  similarMovies: Movie[] = [];

  castMovie: Cast[] = [];


  desktop: boolean;

  loading: boolean;
  err: boolean;

  
  constructor( private movieService: MoviedbService,
               private activatedRoute: ActivatedRoute,
               private location: Location,
               private router: Router) {
                this.err = false;
                this.loading = true;
               }


               
  ngOnInit(): void {


    this.activatedRoute.params.subscribe(routeParams => {
       
      let id = routeParams.id;
      combineLatest([
        //getMovie
        this.movieService.getMovie( id ),
        //getSimilar
        this.movieService.getSimilar( id ),
         //getCast
        this.movieService.getCast( id )
      ]).subscribe( ( [pelicula, similar, cast] ) => {
        
        if(!pelicula){
          this.router.navigateByUrl('home');
        }
        this.pelicula = pelicula;
        this.similarMovies = similar.results;
        this.castMovie = cast;
        this.loading = false;
      }),
      (err: any) => {
        this.loading = false;
        this.err = true;
      };
    });
  
    
                   
  }

  
  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
    New Value: ${$event.newValue}, 
    Checked Color: ${$event.starRating.checkedcolor}, 
    Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  getClass(titulo){
    if(titulo.length <= 6){
       return 'sm-title';
    }
    if(titulo.length <= 17){
      return'md-title';
    }
    if(titulo.length > 17){
      return 'lg-title';
    }
  }

  goBack() {
    this.location.back();
  }
}


