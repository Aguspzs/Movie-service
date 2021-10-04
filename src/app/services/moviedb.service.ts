import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';


@Injectable({
  providedIn: 'root'
})
export class MoviedbService {

  private urlMoviedb: string = 'https://api.themoviedb.org/3';

  public cargando: boolean = false;
  

  peliculas: any[] = [];

  constructor(private http: HttpClient) { }

  get params() {
    return {
      api_key: '706ac24d20b53d2dcf7b10b2d7de8927',
      language: 'en-US',
      page: '1'
    }
  }

  getNowPlaying(page:number):Observable<Movie[]> {
  
    if(page!==1){

      //Prevent loop loading on infinite scroll
      if(this.cargando){return of([]);}
    }
  
    this.cargando = true;

    const params = {...this.params, page: page.toString()};

    return this.http.get<CarteleraResponse>(`${this.urlMoviedb}/movie/now_playing`,{
      params 
    }).pipe(map( (resp) => resp.results), 
            tap( () => {
              this.cargando = false
            }))
   
  }

  getTopRated(page:number):Observable<Movie[]> {

    if(page!==1){

      //Prevent loop loading on infinite scroll
      if(this.cargando){return of([]);}
    }
    
    this.cargando = true;

    const params = {...this.params, page: page.toString()};

    return this.http.get<CarteleraResponse>(`${this.urlMoviedb}/movie/top_rated`,{
      params   
    }).pipe(map( (resp) => resp.results), 
    tap( () => {
      this.cargando = false
    }));

  }

  getUpcoming(page:number):Observable<Movie[]> {

    if(page!==1){

      //Prevent loop loading on infinite scroll
      if(this.cargando){return of([]);}
    }
    this.cargando = true;

    const params = {...this.params, page: page.toString()};

    return this.http.get<CarteleraResponse>(`${this.urlMoviedb}/movie/upcoming`,{
      params   
    }).pipe(map( (resp) => resp.results), 
    tap( () => {
      this.cargando = false
    }));
    
  }

  searchMovies( text: string, page:number ):Observable<CarteleraResponse>{

    if(this.cargando){return of();}

    this.cargando = true;

    const params = {...this.params, page: page.toString(), query: text };

    return this.http.get<CarteleraResponse>(`${this.urlMoviedb}/search/movie`, {
     params
    }).pipe(tap( () => {

      this.cargando = false;
     }));
  }

  getMovie( id: number ):Observable<MovieResponse>{

    return this.http.get<MovieResponse>(`${this.urlMoviedb}/movie/${ id }`,{
      params: this.params   
    }).pipe(catchError( err => of(null)))
   
  }

  getSimilar( id: string ):Observable<CarteleraResponse>{

    return this.http.get<CarteleraResponse>(`${this.urlMoviedb}/movie/${ id }/similar`,{
      params: this.params   
    });

  }

  getCast( id: string ):Observable<Cast[]> {
  
    return this.http.get<CreditsResponse>(`${ this.urlMoviedb }/movie/${ id }/credits`,{
      params: this.params
    }).pipe( map( resp => resp.cast ));
  }

}
