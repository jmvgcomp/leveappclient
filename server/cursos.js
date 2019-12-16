var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var cursoSchema = new Schema({
    nome: String,
}, {versionKey: false});

module.exports = mongoose.model("Curso", cursoSchema);