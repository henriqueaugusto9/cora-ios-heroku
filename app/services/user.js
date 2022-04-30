const log = require('../../helpers/log');
const User = require('../models/user');
const sgMail = require('@sendgrid/mail');
const Construction = require('../models/construction');
const Progress = require('../models/progress');

const sendGridKey = process.env.SG_KEY || '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'

if (!sendGridKey) {
  throw(new Error('SendGrid: Chave não definida. Verifique a variável de ambiente SG_KEY.'));
}

sgMail.setApiKey(sendGridKey);

const resetPasswordAdm = async (email, name, token) => {
    
  log.info(`Usuário do Painel ${email} solicitou a recuperação de senha`)

  return sgMail.send({
    to: email,
    from: 'contato@smartigvestibulares.com',
    templateId: 'd-b97d9f636aa6408f863856d36ccd9ad4',
    dynamic_template_data: {
      name,
      recoveryUrl: `https://smartig-painel.herokuapp.com/recuperar-senha/${token}`
    }
  })
}

const resetPasswordStudent = async (email, name, token) => {
    
  log.info(`Aluno do Painel ${email} solicitou a recuperação de senha`)

  return sgMail.send({
    to: email,
    from: 'contato@smartigvestibulares.com',
    templateId: 'd-b97d9f636aa6408f863856d36ccd9ad4',
    dynamic_template_data: {
      name,
      recoveryUrl: `https://smartig-painel.herokuapp.com/recuperar-senha/${token}`
    }
  })
}

const mapToSimpleUser = async (user = [User]) => {
  let users = []
  user.map( user => {
    let coach = { 
      id: user._id,
      userName: user.name
    }
    users.push(coach)
  })
  return users
}

const EMPTYBUILD = async (id = String, name = String) => {
    const build = {
      endereco: "",
      lote: "",
      quadra: "",
      proprietario: name,
      inicioContrato: "",
      docs: {
          ART: "",
          matricula: "",
          relContribuinte: "",
          alana: "",
          habiteSe: ""
      },
      owner: id
  }
  return build
}

const EMPTYFINANCE = async (id = String) => {
    const finance = {
      link: "",
      owner: id
    }

    return finance
}

const EMPTYPROGRESS = async (id = String) => {
    const progress = {
        aprovacao: {
            percentage : 0,
            level : 0,
            description : ""
        },
        obra: {
            percentage : 0,
            level : 0,
            description : ""
        },
        comercializacao: {
            percentage : 0,
            level : 0,
            description : ""
        },
        owner: id
  }
  return progress
}

const DEFAULTPAYMENT = async (id = String) => {
  const d = new Date()
  const month = d.getMonth() + 1
  const year = d.getUTCFullYear()
  const date = `30/${month}/${year}`

  const payment = {
    user: id,
    expiresDate: date
}

return payment
}

const mapToConstructionWithImage = async (param = Construction, url, title) => {
  const construction = param
  const image = { title: title, image: `${url}`}
  construction.images.push(image)
  
  return construction
}

const mapToConstructionWithoutImage = async (param = Construction, id) => {
  const construction = param

  const imagesWithoutId = construction.images.filter(function(element){
    return element.id != id
  })
  construction.images = imagesWithoutId
  
  return construction
}

const mapToProgressWithImage = async (param = Progress, url, title, indexesId) => {
  const progress = param
  const image = { title: title, image: `${url}`}

  progress.progressTypes.map(item => {
    item.indexes.filter(function(element){
      if(element.id == indexesId) {
        element.images.push(image)
      }
    })
  })
  
  return progress
}

const mapToProgressWithoutImage = async (param = Progress, urlId, indexesId) => {
  const progress = param
  let newIndexes = [] 
  
  progress.progressTypes.map(item => {
    item.indexes.map(index => {
      if(index.id == indexesId) {
        index.images.map(image => {
          if(image.id != urlId) {
            newIndexes.push(image)
          }
        })
      }
    })
  })

  console.log(newIndexes)

  progress.progressTypes.map(progressType => {
    progressType.indexes.map( p => {
      p.images.map( image => {
        if (image.id == urlId) {
          p.images = newIndexes
        }
      })
    })
  })

  return progress
}

module.exports = { 
  resetPasswordAdm,
  resetPasswordStudent,
  mapToSimpleUser,
  EMPTYPROGRESS,
  EMPTYFINANCE,
  EMPTYBUILD,
  DEFAULTPAYMENT,
  mapToConstructionWithImage,
  mapToProgressWithImage,
  mapToConstructionWithoutImage,
  mapToProgressWithoutImage
}