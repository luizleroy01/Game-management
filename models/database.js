const Sequelize = require('sequelize')

const connection = new Sequelize("game_management","root","******",{
    host:"localhost",
    dialect:"mysql"
})

connection.authenticate()
.then(function(){
    console.log('conexão realizada com sucesso')
}).catch(function(){
    console.log('erro de conexão')
});

module.exports = connection;