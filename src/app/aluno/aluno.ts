import { Curso } from '../curso/curso';

export interface Aluno {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    cursos: Array<Curso>;
}
