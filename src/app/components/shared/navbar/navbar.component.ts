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
    
  }

  toggle(){
    this.menu = !this.menu;
   
    //Prevent scrolling when menu is on
    if (this.menu) {
      window.onscroll = () => {
        window.scrollTo(0, 0);
      }
    }else{
      window.onscroll = null;
    }
  }

  search(value){
    if(value === ''){
      return
    }
    this.toggle();
    this.router.navigate(['/search'], { queryParams: { query: value} });
    
  }





}
