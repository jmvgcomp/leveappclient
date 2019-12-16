var express = require('express');
var router = express.Router();
var Aluno = require('../model/aluno')


router.post('/', (req, res) => {
    let a = new Aluno({
        nome: req.body.nome,
        cpf: req.body.cpf,
        telefone: req.body.telefone,
        cursos: req.body.cursos
    });

    a.save((error, aluno) => {
        if(error)
            res.status(500).send(error);
        else
            res.status(200).send(aluno);
    })
})

router.get('/', (req, res) => {
    Aluno.find().exec((error, aluno) => {
        if(error)
            res.sta.stat(500).send(error)
        else
            res.status(200).send(aluno)
    })
})


router.delete('/:id', (req, res) => {
    Aluno.deleteOne({_id: req.params.id}, (error) =>{
        if(error)
            res.status(500).send(error)
        else 
            res.status(200).send({})
    })
})

router.patch('/:id', (req, res) =>{
    Aluno.findById(req.params.id, (error, aluno) => {
        if(error)
            res.status(500).send(error)
        else if(!aluno)
            req.status(404).send({})
        else {
            aluno.nome = req.body.nome,
            aluno.cpf = req.body.cpf,
            aluno.telefone = req.body.telefone,
            aluno.cursos = req.body.cursos;
            aluno.save((error, aluno) => {
                if(error)
                    res.status(500).send(error)
                else
                    res.status(200).send(aluno)
            })
        }
    })
})

module.exports = router;