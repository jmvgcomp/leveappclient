import { Curso } from '../curso/curso';

export interface Aluno {
    _id: string;
    nome: string;
    cpf: string;
    telefone: string;
    cursos: Curso[];
}
