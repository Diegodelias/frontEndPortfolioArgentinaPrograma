import { Component } from '@angular/core';
import { ApiService } from './servicios/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // providers:[ApiService],
})
export class AppComponent {
  title = 'frontPortfolio';
  // constructor(private sobremiSvc: ApiService){}
  // ngOnInit(){
  //     this.sobremiSvc.getUser().subscribe( res => {
  //       console.log('Res gato' , res)
  //     } ) 
  // }
}
