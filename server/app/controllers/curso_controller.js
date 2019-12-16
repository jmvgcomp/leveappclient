var express = require('express');
var router = express.Router();
var Curso = require('../model/curso')

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

router.delete('/:id', (req, res) =>{
    let id = req.params.matricula;
    Curso.deleteOne({matricula: id}, (error) => {
        if(error)
            res.status(500).send(error);
        else
            res.status(200).send({});
    })
})

router.patch(':/id', (req, res)=>{
    Curso.findById(req.params.id, (error, curso) =>{
        if(error)
            res.status(500).send(error);
        else if(!curso)
            res.status(404).send({});
        else{
            curso.nome = req.body.nome;
            curso.save()
            .then((c) => res.status(200).send(c))
            .catch((e) => res.status(500).send(e));
        }
    })
})
module.exports = router;