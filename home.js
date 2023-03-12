const express = require('express')
const path = require('path')
const app = express()
var session = require('express-session')
const users = require('./models/users.js')
const bodyParser = require('body-parser')

app.use(express.json());

//configura a engine do express para renderizar arquivos html
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

//conteúdo estáticos como imagens e sons no diretório public
app.use('/public',express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'/pages'));

app.use(session({secret: 'keyboard cat',cookie: { maxAge : 60000 }}))

app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

//rota para a tela principal do site
app.get('/',(req,res)=>{
    res.render('home',{});
})

//rota para acesso ao formulário de cadastro
app.post('/cadastrar', async(req,res)=>{
    console.log(req.body);
    await users.create({"nome":req.body.nome,"email":req.body.email,"senha":req.body.senha,"nickname":req.body.nickname})
    .then(() =>{
        //res.send('<h2>Página de cadastro</h2>');
        res.render('success-insert',{})
        return res.json({
            erro:false,
            message:"usuario cadastrado com sucesso"
        })
    }).catch(() =>{
        return res.status(400).json({
            erro:true,
            message:"usuario não foi cadastrado",
        })
    })
})

app.get('/entrar', (req,res) =>{
    res.render('form-login',{});
})
//rota para login no site e inicia a sessão
app.get('/user/login',(req,res)=>{
    if(req.session.login == null){
        req.session.login = "Luiz Eduardo";
        console.log(req.body);
        
    }else{
        res.send(req.session.login);
    }
})

//rota responsável por listar os conteúdos contidos na conta de cada usuário
/* ainda em desenvolvimento */
app.get('/buscar',async (req,res) =>{
    const busca = await users.findAll();
    console.log(busca);
})


app.listen(8080,()=>{
    console.log('servido do portal funcionando')
})