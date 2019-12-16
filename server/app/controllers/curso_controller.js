var express = require('express');
var router = express.Router();
var Curso = require('../model/curso')
var Aluno = require('../model/aluno')


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

router.delete('/:id', async (req, res) =>{
    try{
    let id = req.params.id;
    let alunos = await Aluno.find({cursos: id}).exec();
    if(alunos.length > 0){
        res.status(500).send({msg: "Você não pode remover este curso! Há alunos matriculados."})
    }else{
       await Curso.deleteOne({_id: id}),
        res.status(200).send({})
    }    
        }catch(error){
            res.status(500).send({msg: "Erro interno", error: error});
        }
})

router.patch('/:id', (req, res)=>{
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