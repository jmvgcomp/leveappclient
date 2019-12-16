var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var alunoSchema = new Schema({
    nome: String,
    cpf: String,
    telefone: String,
    cursos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Curso' }]
}, {versionKey: false});

module.exports = mongoose.model("Aluno", alunoSchema);