import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  readonly url = 'https://levecursosapi.herokuapp.com/api/cursos'
  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Array<Curso>>{
    return this.http.get<Array<Curso>>(this.url);
  }

  adicionar(curso: Curso): Observable<Curso>{
    return this.http.post<Curso>(this.url, curso);
  }

}
