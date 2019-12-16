import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { Aluno } from './aluno';
import { CursoService } from '../curso/curso.service';
import { map, tap, take } from 'rxjs/operators';
import { Curso } from '../curso/curso';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  readonly url = 'http://localhost:8080/api/alunos';
  private alunoSubject$: BehaviorSubject<Aluno[]> = new BehaviorSubject<Aluno[]>(null);
  private carregado: boolean = false;

  constructor(private http: HttpClient, private cursoService: CursoService) {
   }


  listarTodos(): Observable<Aluno[]>{
    if(!this.carregado){
      combineLatest(
        this.http.get<Aluno[]>(this.url), this.cursoService.listarTodos())
        .pipe(
          tap(([alunos, cursos]) => console.log(alunos, cursos)),
          map(([alunos, cursos]) => {
            for(let a of alunos){
              let ids = (a.cursos);
              a.cursos = ids.map((id)=>cursos.find(c => c.matricula == id.matricula))
            }
            return alunos;
          }), tap((alunos) => console.log(alunos))
      )
    
      .subscribe(this.alunoSubject$);
      this.carregado = true;
    }
    return this.alunoSubject$.asObservable()
  }

  adicionar(aluno: Aluno): Observable<Aluno>{
    let cursos = (aluno.cursos as Curso[]).map(cursos => cursos.matricula)
    return this.http.post<Aluno>(this.url, {...aluno, cursos}).pipe(
      tap((a) => {
        this.alunoSubject$.getValue().push({...aluno, id: a.id})
      })
    )
  }

  deletar(aluno: Aluno): Observable<any>{
    return this.http.delete(`${this.url}/${aluno.id}`)
      .pipe(
        tap(() => {
          let alunos = this.alunoSubject$.getValue();
          let i = alunos.findIndex(a => a.id == aluno.id)
          if(i >= 0)
            alunos.splice(i, 1)
        })
      )
  }

  atualizar(aluno: Aluno): Observable<Aluno>{
    let cursos = (aluno.cursos as Curso[]).map(cursos => cursos.matricula)
    return this.http.put<Aluno>(`${this.url}/${aluno}`, {...aluno, cursos} )
      .pipe(
        tap(() => {
          let alunos = this.alunoSubject$.getValue();
          let i = alunos.findIndex(a => a.id == aluno.id);
          if(i >= 0)
            alunos[i] = aluno;
        })
      )
  }

}
