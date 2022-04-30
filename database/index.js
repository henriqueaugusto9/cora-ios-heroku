const mongoose = require('mongoose');
const log = require('../helpers/log');

const uri = 'mongodb+srv://smartig15:smartig15@smartig-db.pw2ua.mongodb.net/smartig-db?retryWrites=true&w=majority'

if (!uri) {
    throw(new Error('Banco de Dados: URI não definida. Verifique a variável de ambiente MONGODB_URI.'));
}

log.info(`Banco de Dados: Conectando em 3 2 1 ...`);

mongoose.connect(uri, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(() => {
        log.ok("Banco de Dados: Conectado.");
    })
    .catch(err => {
        log.error(`Banco de Dados: ${err.message}`);
    })

mongoose.set('useCreateIndex', true);

mongoose.Promise = global.Promise;

module.exports = mongoose;