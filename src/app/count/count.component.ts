import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-count',
  templateUrl: './count.component.html',
  styleUrls: ['./count.component.css']
})
export class CountComponent implements OnInit {

  start = false;
  counter = 5;
  interval:any;
  constructor(private router: Router) { }
  startCounter(){
    this.start = !this.start;    
    
  
        this.router.navigate(['start']);
     
  }

  ngOnInit(): void {
  }

}
