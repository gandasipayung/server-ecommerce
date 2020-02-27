module.exports = (err, req, res, next) => {
  if(err.name === 'SequelizeValidationError') {
    let errors = []
    err.errors.forEach(error => {
      errors.push(error.message)     
    })
    res.status(400).json({
      msg: 'Bad Request',
      errors
    })
  }else if (err.name === 'SequelizeUniqueConstraintError') {
    let errors = err.errors[0].message
    res.status(400).json({
      msg: 'Bad Request',
      errors
    })
  } else if (err.name === 'LoginFailed') {
    res.status(err.status).json({
      msg: err.msg,
    })
  } else if (err.name === 'AuthenticationError') {
    res.status(err.status).json({
      msg: err.msg
    })
  } else if (err.name === 'AuthorizationError') {
    res.status(err.status).json({
      msg: err.msg
    })
  }
  else {
    console.log(err)
    res.status(500).json(err)
  }
}