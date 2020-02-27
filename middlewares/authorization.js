const { User } = require('../models')

module.exports = (req, res, next) => {
  User
    .findByPk(req.currentUserId)
    .then(user => {
      if(user.dataValues.isAdmin){
        next()
      } else {
        next({
          name: 'AuthorizationError',
          msg: 'Not Authorized',
          status: 401
        })
      }
    })
    .catch(next)
}