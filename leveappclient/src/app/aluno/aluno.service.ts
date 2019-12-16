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

  readonly url = 'http://localhost:3000/alunos';
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
              let ids = (a.cursos as string[]);
              a.cursos = ids.map((id)=>cursos.find(c => c._id == id))
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
    let cursos = (aluno.cursos as Curso[]).map(c => c._id)
    return this.http.post<Aluno>(this.url, {...aluno, cursos}).pipe(
      tap((a) => {
        this.alunoSubject$.getValue().push({...aluno, _id: a._id})
      })
    )
  }

  deletar(aluno: Aluno): Observable<any>{
    return this.http.delete(`${this.url}/${aluno._id}`)
      .pipe(
        tap(() => {
          let alunos = this.alunoSubject$.getValue();
          let i = alunos.findIndex(a => a._id == aluno._id)
          if(i >= 0)
            alunos.splice(i, 1)
        })
      )
  }

  atualizar(aluno: Aluno): Observable<Aluno>{
    let cursos = (aluno.cursos as Curso[]).map(cursos => cursos._id)
    return this.http.put<Aluno>(`${this.url}/${aluno}`, {...aluno, cursos} )
      .pipe(
        tap(() => {
          let alunos = this.alunoSubject$.getValue();
          let i = alunos.findIndex(a => a._id == aluno._id);
          if(i >= 0)
            alunos[i] = aluno;
        })
      )
  }

}
