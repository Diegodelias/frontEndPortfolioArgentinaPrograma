import { Component } from '@angular/core';
import { ApiService } from './servicios/api.service';
import { AuthService } from './servicios/auth.service';

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

  constructor(public authService: AuthService) {}
}
