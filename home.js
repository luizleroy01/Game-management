const express = require('express')
const path = require('path')
const app = express()
var session = require('express-session')

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