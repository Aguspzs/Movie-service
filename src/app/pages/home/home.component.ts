import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { MoviedbService } from 'src/app/services/moviedb.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  latest: Movie[] = [];
  toprated:  Movie[] = [];
  upcoming:  Movie[] = [];


  loading: boolean;
  err: boolean;


  constructor( private movieService: MoviedbService ) {
    
    this.err = false;
    this.loading = true;
    
  }

  ngOnInit(): void {
    //Movies on Theaters
    this.movieService.getNowPlaying(1).subscribe(
      movies => {
        this.latest = movies
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        this.err = true;
      } 
    );

    //Top Rated Movies
    this.movieService.getTopRated(1).subscribe(
      movies =>{
        this.toprated = movies;
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        this.err = true;
      } 
    );

    //Upcoming Movies
    this.movieService.getUpcoming(1).subscribe(
      movies =>{
        this.upcoming = movies;
        this.loading = false;
      },
      (err: any) => {
        this.loading = false;
        this.err = true;
      } 
    );
  }

}
