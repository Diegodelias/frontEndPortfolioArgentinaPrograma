import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {  throwError } from 'rxjs';
import { SobremiModel } from '../components/sobremi/sobremiModel';
import { JwtClientService } from './jwt-client.service';

// https://portfoliobackdiegodelias.herokuapp.com/
// const apiUrlUpdate =  'http://localhost:8080/usuarios';
// const apiUrlUpdateNuevo2 =  'http://localhost:8080/usuarios/acciones/update/sincambios';
// const apiUrlUpdateNuevo =  'http://localhost:8080/usuarios/acciones/update';
// const apiUrlUpdateBorrar =  'http://localhost:8080/usuarios/acciones/borrar';
const apiUrlUpdate =  'https://portfoliobackdiegodelias.herokuapp.com/usuarios';
const apiUrlUpdateNuevo2 =  'https://portfoliobackdiegodelias.herokuapp.com/usuarios/acciones/update/sincambios';
const apiUrlUpdateNuevo =  'https://portfoliobackdiegodelias.herokuapp.com/usuarios/acciones/update';
const apiUrlUpdateBorrar =  'https://portfoliobackdiegodelias.herokuapp.com/usuarios/acciones/borrar';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  imagenUrl = 'https://portfoliobackdiegodelias.herokuapp/cloudinary/';
  
  private apiUrl: string = 'https://portfoliobackdiegodelias.herokuapp.com/usuarios';
  

  constructor(private httpClient : HttpClient   , private jwt :  JwtClientService) { }

  public getUser(): Observable<SobremiModel[]> {
    return this.httpClient.get<SobremiModel[]>(this.apiUrl);}


  public update(id, data):Observable<any>{
      return this.httpClient.put<any>(`${apiUrlUpdateNuevo}/${id}`,data);
      //return this.http.put<any>(this.url+`update/${id}`,usu);
    }



  public updateNull(id, data):Observable<any>{
      return this.httpClient.put<any>(`${apiUrlUpdateNuevo2}/${id}`,data);
      //return this.http.put<any>(this.url+`update/${id}`,usu);
    }   
    get(id): Observable<any> {
      return this.httpClient.get(`${apiUrlUpdate}/${id}`);
    }
  



  postSobremi(data) {
      return this.httpClient.post(this.apiUrl,data)
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

  login(username: string, password: string) {
    console.log("eyyyyyyyy")
    let req = { "userName" : username , "password" : password }
    return this.jwt.generateToken(req);
    
  }



  deleteSobremi(id: number): Observable<Object>{
    return this.httpClient.delete(`${apiUrlUpdateBorrar}/${id}`);
  }



}
