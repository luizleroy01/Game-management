const Sequelize = require('sequelize')

const connection = Sequelize("game_management","root","luiz2001",{
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