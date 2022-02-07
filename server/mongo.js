const mongoose = require('mongoose');
const env = require('./environment/environment')

mongoose.Promise = global.Promise; // use promise API built into node


const mongoUri = `mongodb://${env.dbName}:${env.key}@${env.dbName}.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@${env.dbName}@`

function connect() {
    return mongoose.connect(mongoUri)
}

module.exports = {
    connect,
    mongoose
};