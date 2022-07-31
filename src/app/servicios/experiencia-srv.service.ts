import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ExperienciaModel } from '../modelos/experienciaModel';
import { Observable } from 'rxjs/internal/Observable';

const apiUrlBorrar =  'https://portfoliobackdiegodelias.herokuapp.com/trabajos/acciones/borrar';
const apiUrlUpdate =  'https://portfoliobackdiegodelias.herokuapp.com/trabajos';
const apiUrlUpdate2 =  'https://portfoliobackdiegodelias.herokuapp.com/trabajos/acciones/actualizar/sincambios';  
const apiUrlUpdate3 =  'https://portfoliobackdiegodelias.herokuapp.com/trabajos/acciones/actualizar';  

@Injectable({
  providedIn: 'root'
})
export class ExperienciaSrvService {

  
  private apiUrl: string = 'https://portfoliobackdiegodelias.herokuapp.com/trabajos';
         

  constructor(private httpClient : HttpClient) { }

  // postExperiencia(data : any ){
  //   return this.httpClient.post<any>(this.apiUrl, data)
  //   .pipe(map((res:any)=>{

  //     return res;
  //   }))

  // }

  postExperiencia(data) {
    return this.httpClient.post(this.apiUrl, data);
  }
  
  public getExperience(): Observable<ExperienciaModel[]> {
    return this.httpClient.get<ExperienciaModel[]>(this.apiUrl);}



  // public update(experiencia: ExperienciaModel):Observable<any>{
  //     return this.httpClient.put<any>(this.apiUrl+"/1",experiencia);
  //     //return this.http.put<any>(this.url+`update/${id}`,usu);
  //   }

  update(id, data): Observable<any> {
    return this.httpClient.put(`${apiUrlUpdate3}/${id}`, data);
  }

  public updateNull(id, data):Observable<any>{
    return this.httpClient.put<any>(`${apiUrlUpdate2}/${id}`,data);
    //return this.http.put<any>(this.url+`update/${id}`,usu);
  }   
  // get(id): Observable<any> {
  //   return this.httpClient.get(`${apiUrlUpdate}/${id}`);
  // }




  get(id): Observable<any> {
    return this.httpClient.get(`${apiUrlUpdate}/${id}`);
  }

  deleteExperiencia(id: number): Observable<Object>{
    return this.httpClient.delete(`${apiUrlBorrar}/${id}`);
  }

}
