import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { RatingModule } from 'ng-starrating';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { BannerComponent } from './components/banner/banner.component';
import { SearchComponent } from './pages/search/search.component';
import { PeliculaImagenPipe } from './pipes/pelicula-imagen.pipe';
import { MovieComponent } from './pages/movie/movie.component';
import { SlideshowComponent } from './components/slideshow/slideshow.component';
import { DisplayComponent } from './components/display/display.component';
import { GridComponent } from './components/grid/grid.component';
import { ListComponent } from './pages/list/list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BannerComponent,
    SearchComponent,
    PeliculaImagenPipe,
    MovieComponent,
    SlideshowComponent,
    DisplayComponent,
    GridComponent,
    ListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
