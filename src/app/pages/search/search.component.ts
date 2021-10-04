import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { MoviedbService } from 'src/app/services/moviedb.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  query = '';

  movies: Movie[] = [];
  moviesLoad: Movie[] = [];

  totalPages: number;
  nextPage: number = 2;

  loading: boolean;
  err: boolean;
  notFound = false;

  @HostListener('window:scroll', ['$event'])
  onScroll() {

      const pos = ( document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
      const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );
  
      if(pos>max){

        if(this.nextPage<=this.totalPages) { 
          
          this.movieService.searchMovies(this.query, this.nextPage).subscribe( resp => {
              this.moviesLoad = resp.results.filter( (movie) => {
                movie.poster_path !== null && movie.adult == false;
              } );
              this.movies.push(...this.moviesLoad);
              this.nextPage+=1;
              
       
            });
        }
        
      }

  }

  constructor( public movieService: MoviedbService, private activatedRoute: ActivatedRoute ) { 
    
  }

  ngOnInit(): void {
  
    
    this.activatedRoute.queryParams.subscribe(params =>{
      this.query = params.query;
    })
    this.searchMovie()

  }
  
  searchMovie(){
    
    if(this.query.length == 0){
      return;
    }
    
    this.notFound = false;
    this.err = false;
    this.loading = true;

    this.movieService.searchMovies(this.query, 1).subscribe(
      resp => {
        //Don't load content in loop
        this.totalPages = resp.total_pages;
        this.movies = resp.results;
        this.loading = false;
        if(this.movies.length == 0){
          this.notFound = true;
        }
      });
  }
}
