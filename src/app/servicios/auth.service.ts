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



  login(username: string, password: string) {
    console.log("entrooo");
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
