const { Product, Category } = require('../models')

class ProductController {
  static addProduct (req, res, next) {
    let product = {
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl,
      price: req.body.price,
      stock: req.body.stock,
      CategoryId: req.body.CategoryId
    }
    Product
      .create(product)
      .then(data => {
        res.status(201).json({
          msg: 'Create Product Success',
          data
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static getAllProduct (req, res, next) {
    Product
      .findAll({
        include: {
          model: Category
        },
        order: [['id']]
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static getProduct (req, res, next) {
    Product
      .findOne({
        include: {
          model: Category
        },
        where: {
          id: req.params.id
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static updateProduct (req, res, next) {
    let { name, description, imageUrl, price, stock, CategoryId } = req.body
    Product
      .update({
        name,
        description,
        imageUrl,
        price,
        stock,
        CategoryId
      },{
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        res.status(200).json({
          msg: 'Update product success',
          result
        })
      })
      .catch(next)
  }

  static deleteProduct (req, res, next) {
    Product
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        res.status(200).json({
          msg: 'Delete product success',
          result
        })
      })
      .catch(next)
  }
}


module.exports = ProductController
