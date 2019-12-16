import { Component, OnInit } from '@angular/core';
import { AlunoService } from './aluno.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Aluno } from './aluno';
import { CursoService } from '../curso/curso.service';
import { Curso } from '../curso/curso';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { error } from 'protractor';

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

  constructor(private alunoService: AlunoService, private fb: FormBuilder, private cursoService: CursoService, private snackBar: MatSnackBar) { }

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
      this.notificar("Aluno atualizado!")
    }else{
      this.alunoService.adicionar(dado).subscribe();
      this.notificar("Aluno cadastrado!");
    }
    this.resetar();
  }

  editar(aluno: Aluno){
    this.alunoForm.setValue(aluno);
  }

  deletar(aluno: Aluno){
    this.alunoService.deletar(aluno).subscribe(() => this.notificar("Aluno deletado!"), 
    (error) => {
      this.notificar("Error ao deletar produto!");  
      console.error(error);
    })
  }

  notificar(msg: string){
    this.snackBar.open(msg, "OK", {duration: 1500})

  }

  resetar(){
    this.alunoForm.reset();
  }

  ngOnDestroy(){
    this.unsubscribe$.next()
  }

}
