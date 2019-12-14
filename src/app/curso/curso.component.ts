import { Component, OnInit } from '@angular/core';
import { Curso } from './curso';
import { CursoService } from './curso.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  nomeCurso: string = '';
  cursos: Array<Curso>;

  constructor(private cursoService: CursoService) { }

  ngOnInit() {
    this.cursoService.listarTodos().subscribe((cursos) => this.cursos = cursos)
  }

  salvar(){
    this.cursoService.adicionar({nome: this.nomeCurso}).subscribe(
      (curso) => {console.log(curso); this.limparCampo()},
      (erro) => console.error(erro))
  }

  limparCampo(){
    this.nomeCurso = '';
  }

}
