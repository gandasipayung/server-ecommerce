const { User } = require('../models')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'indomie'

module.exports = (req, res, next) => {
  const token = req.headers.token
  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET)
      if (decoded) {
        User
          .findByPk(decoded.id)
          .then(user => {
            if(user) {
              req.currentUserId = user.id,
              req.currentUsername = user.username
              next()
            } else {
              next({
                name: 'AuthenticationError',
                msg: 'Not Authenticated',
                status: 401
              })
            }
          })
      }
    }
    catch (err){
      next(err)
    }
  } else {
    next({
      name: 'AuthenticationError',
      msg: 'You Must Login First',
      status: 401
    })
  }
}