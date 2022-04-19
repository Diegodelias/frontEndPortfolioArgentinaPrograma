import { Component, OnInit } from '@angular/core';
import 'boxicons';


declare var particlesJS: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    particlesJS.load('particles-js', 'particles.json', null);
  }

}
