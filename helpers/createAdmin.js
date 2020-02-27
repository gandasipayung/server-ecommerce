let admin = {
  username: 'Admin',
  email: 'admin@admin.com',
  password: 'admin123',
  isAdmin: true
}

const SECRET = process.env.SECRET || 'indomie'
const jwt = require('jsonwebtoken')
const { User } = require('../models')

module.exports = function () {
  return new Promise((resolve, reject) => {
    User
      .create(admin)
      .then(user => {
        let payload = {
          id: user.id,
          username: user.username,
          email: user.email
        }
       adminToken = jwt.sign(payload, SECRET)
       resolve(adminToken)
      })
      .catch(err => {
        reject(err)
      })
  })
}