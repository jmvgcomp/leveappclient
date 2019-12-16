import { Component, OnInit } from '@angular/core';
import { AlunoService } from './aluno.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Aluno } from './aluno';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit {


  alunoForm: FormGroup = this.fb.group({
    _id: [null],
    nome: [''],
    cpf: [''],
    telefone: [''],
    cursos: [[]]
  })

  alunos: Aluno[] = [];
  cursos: Curso[] = [];

  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private alunoService: AlunoService, private fb: FormBuilder, private cursoService: CursoService) { }

  ngOnInit() {
     this.alunoService.listarTodos().pipe(
       takeUntil(this.unsubscribe$)
     ).subscribe((alunos)=> this.alunos = alunos);
     this.cursoService.listarTodos().pipe(
       takeUntil(this.unsubscribe$)
       ).subscribe((cursos) => this.cursos = cursos);

  }

  salvar(){
    let dado = this.alunoForm.value;
    if(dado._id != null){
      this.alunoService.atualizar(dado).subscribe();
    }else{
      this.alunoService.adicionar(dado).subscribe();
    }
  }

  editar(){

  }

  deletar(){

  }

  ngOnDestroy(){
    this.unsubscribe$.next()
  }

}
