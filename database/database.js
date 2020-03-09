const Sequileze = require('sequelize');
const connection = new Sequileze('Blog','root','94236924',{
    host:'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
    
});
module.exports = connection;