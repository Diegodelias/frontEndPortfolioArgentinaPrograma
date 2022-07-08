import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { EducacionModel  } from '../modelos/educacionModel';
import { Observable } from 'rxjs/internal/Observable';

const apiUrlUpdate =  'http://localhost:8080/educacion';
@Injectable({
  providedIn: 'root'
})
export class EduSrvService {
   
  private apiUrl: string = 'http://localhost:8080/educacion';

  constructor(private httpClient : HttpClient) { }

  postEdu(data) {
    return this.httpClient.post(this.apiUrl, data);
  }
  
  public getEdu(): Observable<EducacionModel []> {
    return this.httpClient.get<EducacionModel []>(this.apiUrl);}

    update(id, data): Observable<any> {
      return this.httpClient.put(`${apiUrlUpdate}/${id}`, data);
    }

    get(id): Observable<any> {
      return this.httpClient.get(`${apiUrlUpdate}/${id}`);
    }
  
    deleteEdu(id: number): Observable<Object>{
      return this.httpClient.delete(`${apiUrlUpdate}/${id}`);
    }

}
