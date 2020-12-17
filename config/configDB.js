var configDB = require('./configDB.json');

module.exports = {
    getDbConnectionString: function(){
        return 'mongodb://'+configDB.myHost+"/"+configDB.myDB;
    }
}