import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Imagen } from '../modelos/imagen';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  imagenUrl = 'http://localhost:8080/cloudinary';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Imagen[]> {
    return this.httpClient.get<Imagen[]>(this.imagenUrl + 'list')

  }

  public upload(imagen: File): Observable<any> {
    const formData = new FormData;
    formData.append('multipartFile',imagen);
    return this.httpClient.post<any>(this.imagenUrl + 'upload',formData);
 }

 public delete(id:number):Observable<any> {
  return this.httpClient.delete<any>(this.imagenUrl + `delete/${id}`);
 }
}
