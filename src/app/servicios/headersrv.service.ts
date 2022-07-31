import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { HeaderModel } from '../modelos/headerModel';


const apiUrlUpdateNuevo2 =  'https://portfoliobackdiegodelias.herokuapp.com/usuarios/acciones/update/sincambios';
const apiUrlUpdate =  'https://portfoliobackdiegodelias.herokuapp.com/usuarios/acciones/update';
const apiUrlUpdateBorrar =  'https://portfoliobackdiegodelias.herokuapp.com/usuarios/acciones/borrar';
@Injectable({
  providedIn: 'root'
})
export class HeadersrvService {



  private apiUrl: string = 'https://portfoliobackdiegodelias.herokuapp.com/usuarios';
  

  constructor(private httpClient : HttpClient) { }

  public getUser(): Observable< HeaderModel []> {
    return this.httpClient.get< HeaderModel []>(this.apiUrl);}


  // public update(sobremi:  HeaderModel ):Observable<any>{
  //     return this.httpClient.put<any>(this.apiUrl+"/1",sobremi);
  //     //return this.http.put<any>(this.url+`update/${id}`,usu);
  //   }

  public update(id, data): Observable<any> {
      return this.httpClient.put(`${apiUrlUpdateNuevo2}/${id}`, data);
    }

    get(id): Observable<any> {
      return this.httpClient.get(`${this.apiUrl}/${id}`);
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


  
  deleteSobremi(id: number): Observable<Object>{
    return this.httpClient.delete(`${apiUrlUpdateBorrar}/${id}`);
  }

}
