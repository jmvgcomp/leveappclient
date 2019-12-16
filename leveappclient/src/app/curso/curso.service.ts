import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Curso } from './curso';

@Injectable({
  providedIn: 'root'
})
export class CursoService {
  readonly url = 'http://localhost:8080/api/cursos'

  private cursoSubjec$:  BehaviorSubject<Curso[]> = new BehaviorSubject<Curso[]>(null);
  private carregado: boolean = false;

  constructor(private http: HttpClient) { }

  listarTodos(): Observable<Curso[]>{
    if(!this.carregado){
      this.http.get<Curso[]>(this.url)
      .pipe(tap((cursos) => console.log(cursos)))
      .subscribe(this.cursoSubjec$);
      this.carregado = true;
    }
    return this.cursoSubjec$.asObservable();
  }

  adicionar(curso: Curso): Observable<Curso>{
    return this.http.post<Curso>(this.url, curso).pipe(
      tap((curso: Curso) => this.cursoSubjec$.getValue().push(curso))
    )
  }

  deletar(curso: Curso): Observable<any>{
    return this.http.delete(`${this.url}/${curso.matricula}`).pipe(
      tap(() => { let cursos = this.cursoSubjec$.getValue(); 
        let i = cursos.findIndex(c => c.matricula == curso.matricula);
        if(i >= 0)
          cursos.splice(i, 1)
      } )
    )
  }

}
