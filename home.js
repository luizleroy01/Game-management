const express = require('express')
const path = require('path')
const app = express()
var session = require('express-session')
//const database = require('./database.js')

const {createPool} = require('mysql')

const pool = createPool({
    host:"localhost",
    user:"root",
    password:"rootuser",
    connectionLimit:10
});

pool.query(`select * from game_management.users`,(err,res)=>{
    console.log(res);
})

//configura a engine do express para renderizar arquivos html
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

//conteúdo estáticos como imagens e sons no diretório public
app.use('/public',express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'/pages'));

app.use(session({secret: 'keyboard cat',cookie: { maxAge : 60000 }}))

app.get('/',(req,res)=>{
    res.render('home',{});
})

app.get('/admin',(req,res)=>{
    if(req.session.login == null){
        req.session.login = "Luiz Eduardo";
        res.send('sua sessao foi criada');
    }else{
        res.send(req.session.login);
    }
})




app.listen(3000,()=>{
    console.log('servido do portal funcionando')
})