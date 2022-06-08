import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ExperienciaModel } from '../modelos/experienciaModel';
import { Observable } from 'rxjs/internal/Observable';


const apiUrlUpdate =  'http://localhost:8080/trabajos';
@Injectable({
  providedIn: 'root'
})
export class ExperienciaSrvService {

  
  private apiUrl: string = 'http://localhost:8080/trabajos';
         

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
    return this.httpClient.put(`${apiUrlUpdate}/${id}`, data);
  }

  get(id): Observable<any> {
    return this.httpClient.get(`${apiUrlUpdate}/${id}`);
  }

  deleteExperiencia(id: number): Observable<Object>{
    return this.httpClient.delete(`${apiUrlUpdate}/${id}`);
  }

}
