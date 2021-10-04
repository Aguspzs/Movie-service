import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviedbService } from 'src/app/services/moviedb.service';
import { Movie } from 'src/app/interfaces/cartelera-response';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  movies: Movie[] = [];

  title: string;

  pageTitle:string;

  latestPage: number = 1;
  ratedPage: number = 1;
  upcomingPage: number = 1;


  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const pos = ( document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if ( pos > max ) {

       if( this.movieService.cargando ) { return 
      
      }else{
        if ( this.title === 'latest') {
          this.latestPage+=1
          
          this.movieService.getNowPlaying(this.latestPage).subscribe( resp => {
            this.movies.push(...resp)
          })
        }

        if ( this.title === 'rated') {
          this.ratedPage+=1
          
          this.movieService.getTopRated(this.ratedPage).subscribe( resp => {
            this.movies.push(...resp)
          })
        }

        if ( this.title === 'upcoming') {
          this.upcomingPage+=1
          
          this.movieService.getUpcoming(this.upcomingPage).subscribe( resp => {
            this.movies.push(...resp)
          })
        }
      }
      
      
    }

  }
  

  

  constructor(private movieService: MoviedbService,
              private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params =>{
      this.title = params.title;
      if ( this.title === 'latest') {
        this.pageTitle = 'Latest Movies';
        this.nowPlaying();
      }
      if ( this.title === 'rated') {
        this.pageTitle = 'Top Rated Movies';
        this.topRated();
      }
      if ( this.title === 'upcoming') {
        this.pageTitle = 'Upcoming Movies';
        this.upcoming();
      }
    })
   

  }

  nowPlaying(){
       //Movies on Theaters
       this.movieService.getNowPlaying(1).subscribe(
        movies => {
          this.movies = movies.filter( movie => movie.poster_path !== null );
  
        },
        (err: any) => {
         console.log(err)
        } 
      );
  }

  topRated(){
    //Movies with the best rate
    this.movieService.getTopRated(1).subscribe(
     movies => {
      this.movies = movies.filter( movie => movie.poster_path !== null );

     },
     (err: any) => {
      console.log(err)
     } 
   );
  }

  upcoming(){
    //Upcoming movies
    this.movieService.getUpcoming(1).subscribe(
     movies => {
       this.movies = movies.filter( movie => movie.poster_path !== null );
  
     },
     (err: any) => {
      console.log(err)
     } 
   );
  }
 
}

