import { HttpClient  , HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  constructor(private httpClient:HttpClient) { }

  public generateToken(request) {
    console.log("generate tokeeeeeeeeeeen", request)

    
    return this.httpClient.post<string>("https://portfoliobackdiegodelias.herokuapp.com/authenticate", request, {  responseType: 'text' as 'json' });
  }


  public welcome(token) {
    let tokenStr = 'Bearer ' + token;
    console.log("token stringgg" , tokenStr);

    const headers = new HttpHeaders().set('Authorization', tokenStr);
    return this.httpClient.get<string>("https://portfoliobackdiegodelias.herokuapp/", {headers, responseType: 'text' as 'json' });
  }
}
