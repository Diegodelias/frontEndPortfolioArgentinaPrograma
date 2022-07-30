import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ProyectoModel } from '../modelos/proyectoModel';

const apiUrlUpdate2 =  'http://localhost:8080/proyectos/acciones/update/sincambios';  
const apiUrlUpdate =  'http://localhost:8080/proyectos/acciones/update';
const apiUrlBorrar =  'http://localhost:8080/proyectos/acciones/borrar';
@Injectable({
  providedIn: 'root'
})
export class ProyectossrvService {

  
  private apiUrl: string = 'http://localhost:8080/proyectos';

  constructor(private httpClient : HttpClient) { }



  postProyecto(data) {
    return this.httpClient.post(this.apiUrl, data);
  }
  
  public getProyectos(): Observable<ProyectoModel[]> {
    return this.httpClient.get<ProyectoModel[]>(this.apiUrl);}



  // public update(experiencia: ExperienciaModel):Observable<any>{
  //     return this.httpClient.put<any>(this.apiUrl+"/1",experiencia);
  //     //return this.http.put<any>(this.url+`update/${id}`,usu);
  //   }

  update(id, data): Observable<any> {
    return this.httpClient.put(`${apiUrlUpdate}/${id}`, data);
  }


  
  public updateNull(id, data):Observable<any>{
    return this.httpClient.put<any>(`${apiUrlUpdate2}/${id}`,data);
    //return this.http.put<any>(this.url+`update/${id}`,usu);
  }   

  get(id): Observable<any> {
    return this.httpClient.get(`${apiUrlUpdate}/${id}`);
  }

  deleteProyecto(id: number): Observable<Object>{
    return this.httpClient.delete(`${apiUrlBorrar}/${id}`);
  }






}
