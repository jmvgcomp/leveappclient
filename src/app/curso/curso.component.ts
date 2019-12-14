import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';
import { MatSnackBar } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  nomeCurso: string = '';
  cursos: Array<Curso>;
  private unsubscribe$: Subject<any> = new Subject();

  constructor(private cursoService: CursoService, private notificacao: MatSnackBar) { }

  ngOnInit() {
    this.cursoService.listarTodos().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe((cursos) => this.cursos = cursos)
  }

  salvar(){
    this.cursoService.adicionar({nome: this.nomeCurso}).subscribe(
      (curso) => {this.notificar("Curso cadastrado!"); this.limparCampo()},
      (erro) => console.error(erro))
  }

  limparCampo(){
    this.nomeCurso = '';
  }

  deletar(curso: Curso){
    this.cursoService.deletar(curso).subscribe(
      () => this.notificar("Removido!")
    )
  }

  notificar(msg: string){
    this.notificacao.open(msg, "OK", {duration: 1500})
  }

  ngOnDestroy(){
    this.unsubscribe$.next();
  }

}
