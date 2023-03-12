const Sequelize = require('sequelize')
const db = require('./database.js')

const User = db.define('usuario',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    nome:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    senha:{
        type:Sequelize.STRING,
        allowNull:false
    },
    nickname:{
        type:Sequelize.STRING,
        allowNull:false
    }
});
//cria a tabela se ela não tiver sido criada
User.sync();
module.exports = User;