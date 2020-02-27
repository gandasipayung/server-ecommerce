const { Category } = require('../models')

class CategoryController {

  static getCategory (req, res, next) {
    Category
      .findAll()
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = CategoryController