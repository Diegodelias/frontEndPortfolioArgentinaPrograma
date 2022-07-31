import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SkillsModel  } from '../modelos/skillsModels';



const apiUrlUpdate =  'https://portfoliobackdiegodelias.herokuapp.com/skills';
const apiUrlUpdate2 =  'https://portfoliobackdiegodelias.herokuapp.com/skills/acciones/editar';
const apiUrlBorrar =  'https://portfoliobackdiegodelias.herokuapp.com/skills/acciones/borrar';

// const apiUrlUpdate =  'http://localhost:8080/skills';
// const apiUrlUpdate2 =  'http://localhost:8080/skills/acciones/editar';
// const apiUrlBorrar =  'http://localhost:8080/skills/acciones/borrar';
@Injectable({
  providedIn: 'root'
})
export class SkillSrvService {

  // private apiUrl: string = 'http://localhost:8080/skills';
  private apiUrl: string = 'https://portfoliobackdiegodelias.herokuapp.com/skills';

         

  constructor(private httpClient : HttpClient) { }


  postSkill(data) {
    return this.httpClient.post(this.apiUrl, data);
  }
  
  public getSkills(): Observable<SkillsModel[]> {
    return this.httpClient.get<SkillsModel[]>(this.apiUrl);}



  // public update(experiencia: ExperienciaModel):Observable<any>{
  //     return this.httpClient.put<any>(this.apiUrl+"/1",experiencia);
  //     //return this.http.put<any>(this.url+`update/${id}`,usu);
  //   }

  update(id, data): Observable<any> {
    return this.httpClient.put(`${apiUrlUpdate2}/${id}`, data);
  }

  get(id): Observable<any> {
    return this.httpClient.get(`${apiUrlUpdate}/${id}`);
  }

  deleteSkill(id: number): Observable<Object>{
    return this.httpClient.delete(`${apiUrlBorrar}/${id}`);
  }






}
