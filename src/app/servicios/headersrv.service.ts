import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { HeaderModel } from '../modelos/headerModel';

const apiUrlUpdate =  'http://localhost:8080/usuarios';
@Injectable({
  providedIn: 'root'
})
export class HeadersrvService {



  private apiUrl: string = 'http://localhost:8080/usuarios';
  

  constructor(private httpClient : HttpClient) { }

  public getUser(): Observable< HeaderModel []> {
    return this.httpClient.get< HeaderModel []>(this.apiUrl);}


  // public update(sobremi:  HeaderModel ):Observable<any>{
  //     return this.httpClient.put<any>(this.apiUrl+"/1",sobremi);
  //     //return this.http.put<any>(this.url+`update/${id}`,usu);
  //   }

  public update(id, data): Observable<any> {
      return this.httpClient.put(`${apiUrlUpdate}/${id}`, data);
    }

    get(id): Observable<any> {
      return this.httpClient.get(`${apiUrlUpdate}/${id}`);
    }

  
  public llenarForm(row) {
    
  }
   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
