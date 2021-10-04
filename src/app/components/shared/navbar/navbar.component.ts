import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  menu: boolean = false;
  searchMenu: boolean = true;
  windowWidth: boolean = false;


  constructor(private router: Router, private location: Location) {

  }

  ngOnInit(): void {
    this.location.onUrlChange( (url: string) => {
      let currentUrl = url.slice(0,7);

      if(currentUrl === '/search'){
        this.searchMenu = false;
      }else{
        this.searchMenu = true;
      }
     
    })
  }

  toggle(){
    this.menu = !this.menu;
  }

  search(value){
    if(value === ''){
      return
    }
    this.menu = false;
    this.router.navigate(['/search'], { queryParams: { query: value} });
    
  }





}
