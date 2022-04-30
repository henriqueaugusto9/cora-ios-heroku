const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const log = require('./helpers/log');

const app = express();
const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000

process.env.BUCKET_NAME='mentoria-b4ck/build'
process.env.AWS_ACCESS_KEY_ID='AKIAUHT4WMCIUKGRJ6VJ'
process.env.AWS_SECRET_ACCESS_KEY='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'
process.env.AWS_DEFAULT_REGION='us-east-1'

app.use(cors());
app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

try {
  require('./app/controllers/index')(app);

  app.listen(port, () => {
    log.ok(`Servidor iniciado na porta ${port}`)
  });
} catch (error) {
  log.error(error.message)
}
