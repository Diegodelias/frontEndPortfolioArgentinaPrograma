import { Injectable } from '@angular/core';
import { JwtClientService } from './jwt-client.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_NAME = 'profanis_auth';
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  get token(): any {
    return localStorage.getItem(this.TOKEN_NAME);
  }


  getToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }

  constructor(private apiService: ApiService) { 

    // const token = localStorage.getItem('profanis_auth');
    this._isLoggedIn$.next(!!this.token);
  }

  // authRequest:any={
  //   "userName":"usuarioUno",
  //   "password":"123456"
  // };


  // login(request) {
  //    console.log("lpqtp", request);
  //   // console.log("Request" , request)
  //   // return this.jwtService.generateToken({request}).pipe(
  //   //   tap((response: any)=>{
  //   //     console.log(response.token)
  //   //   })
  //   // );
  //   return this.jwtService.generateToken(request).pipe(
  //     tap((response: any) => {
  //       console.log("verga" , response)
  //       this._isLoggedIn$.next(true);
  //       console.log("porornga" , response.token);
  //       localStorage.setItem(this.TOKEN_NAME, response.token);
     
  //     })
  //   );
  // }

  login(username: string, password: string) {
    return this.apiService.login(username, password).pipe(
      tap((response: any) => {
        this._isLoggedIn$.next(true);
        console.log("TOKKEEN" , response)
        localStorage.setItem(this.TOKEN_NAME, response );
      })
    );
  }


  logout(){
    localStorage.removeItem(this.TOKEN_NAME)
  }


}
