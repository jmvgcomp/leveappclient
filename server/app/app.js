const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const curso_controller = require('./controllers/curso_controller');

const app = express();
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cors());

mongoose.connect('mongodb://localhost:27017/levecursosapi', {useNewUrlParser: true});

app.use('/cursos', curso_controller);

app.listen(3000);