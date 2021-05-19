const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcryptjs = require('bcryptjs')
const { v4: uuid } = require('uuid');

module.exports = app => {
  const { existsOrError, equalsOrError, notExistsOrError } = app.api.validation;
  const { fnGetById: fnPersonGetById, fnSave: fnPersonSave } = app.api.people;

  /// ENCRYPTPASSWORD
  const encryptPassword = password => {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
  }

  /// SIGNUP
  const signup = async (req, res) => {
    const signUp = { ...req.body }
    try {
      existsOrError(signUp.name, 'Nome não informado.')
      existsOrError(signUp.email, 'E-mail não informado.')
      existsOrError(signUp.password, 'Senha não infromada.')
      existsOrError(signUp.confirmPassword, 'Confirmação de senha não informada.')
      equalsOrError(signUp.password, signUp.confirmPassword, 'Senhas não conferem.')

      delete signUp.confirmPassword

      signUp.password = encryptPassword(signUp.password)
      
      const person = {
        idStatus: 1,
        name: signUp.name,
        urls: [{ idType: 71, url: signUp.email }],
        passwords: [{ date: new Date().toISOString().substring(0, 10), password: signUp.password }]
      }

      await fnPersonSave(person)
      
      res.status(200).send()
    } catch(err) {
      res.status(400).send(err)
    }
  }

  /// SIGNIN
  const signin = async (req, res) => {
    const signIn = { ...req.body }
    try {
      existsOrError(signIn.email, 'E-mail não informado.')
      existsOrError(signIn.password, 'Senha não infromada.')
      
      const existentUser = await app.db('people_urls')
        .select('idParent as id')
        .where({ url: signIn.email })
        .andWhere({ idType: 71 })
        .first()

      existsOrError(existentUser, 'E-mail ou senha inválidos.')

      existentUser.password = await app.db('people_passwords')
      .select('password')
      .where({ idParent: existentUser.id })
      .first()
      .then(res => res.password)

      const match = await bcryptjs.compare(signIn.password, existentUser.password)
      existsOrError(match, 'E-mail ou senha inválidos.')
      console.log(match)
      
      const user = await fnPersonGetById(existentUser.id)
      console.log(user)

      const now = Math.floor(Date.now() / 1000)
      const metadata = {
        iat: now,
        reiat: now,
        exp: now + (60 * 60 * 24 * 7)
      }

      const payload = { 
        metadata,
        user
      }

      payload.metadata.token = jwt.encode(payload, authSecret)

      res.status(200).json({ ...payload })
    } catch(err) {
      res.status(400).send(err)
    }
  }

  return { signin, signup }
}
