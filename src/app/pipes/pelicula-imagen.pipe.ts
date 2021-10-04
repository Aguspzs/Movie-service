import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';

@Pipe({
  name: 'peliculaImagen'
})
export class PeliculaImagenPipe implements PipeTransform {

  transform( pelicula: any, poster: boolean = false ): any {
    
    let url = 'https://image.tmdb.org/t/p/w1280';

    if( poster ){
      if(pelicula.poster_path){
        return url + pelicula.poster_path;
      }else if( pelicula.profile_path ){
        return url + pelicula.profile_path;
      }else{
        return "assets/no-image.png";
      }
    }

    if( pelicula.backdrop_path ){
      return url + pelicula.backdrop_path;
    }else{
      if( pelicula.poster_path ){
        return url + pelicula.poster_path;
      }else{
        return "assets/no-image.png";
      }
    }
  }

}
