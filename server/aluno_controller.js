var express = require('express');
var router = express.Router();
var Curso = require('./cursos')

router.post('/', function(req, res){
    let curso = new Curso({ nome: req.body.nome })
    curso.save((error, curso) => {
        if(error)
            res.status(500).send(error)
        else
            res.status(201).send(curso);
    })
})

router.get('/', function(req, res){
    Curso.find().exec((error, curso) => {
        if(error)
            res.status(500).send(error)
        else
            res.status(200).send(curso);
    })
})


