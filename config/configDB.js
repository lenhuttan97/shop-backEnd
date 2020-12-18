var config = require('./config.json');

module.exports = {
    getDbConnectionString: function(){
        return 'mongodb://'+config.database.myHost+"/"+config.database.myDB;
    }
}