import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { SobremiModel } from '../components/sobremi/sobremiModel';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  
  private apiUrl: string = 'http://localhost:8080/usuarios';
  

  constructor(private httpClient : HttpClient) { }

  public getUser(): Observable<SobremiModel[]> {
    return this.httpClient.get<SobremiModel[]>(this.apiUrl);}


  public update(sobremi: SobremiModel):Observable<any>{
      return this.httpClient.put<any>(this.apiUrl+"/1",sobremi);
      //return this.http.put<any>(this.url+`update/${id}`,usu);
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
