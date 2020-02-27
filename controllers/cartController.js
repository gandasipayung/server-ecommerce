const { Cart, Product, User } = require('../models')

class CartController {
  static addCart (req, res, next) {
    let quantity
    let stock
    const data = {
      ProductId: req.body.ProductId,
      UserId: req.currentUserId,
      quantity: req.body.quantity
    }
    Product
      .findByPk(data.ProductId)
      .then(product => {
        stock = product.stock
        return Cart
          .findOne({
            where: {
              ProductId: data.ProductId,
              UserId: req.currentUserId,
              checkout: false
            }
          })
      })
      .then(cart => {
        if(!cart) {
          if (data.quantity <= stock) {
            return Cart.create(data)
          } else {
            throw ({
              name: 'Error'
            })
          }
        } else {
          quantity = cart.quantity += data.quantity
          if(stock >= quantity) {
            return Cart
              .update({
                quantity
              },{
                where: {
                  id: cart.id
                }
              })
          } else {
            throw ({
              name: 'Error'
            })
          }
        }
      })
      .then(cart => {
        res.status(200).json(cart)
      })
      .catch(next)
    
  }

  static getCart (req, res, next) {
    Cart
      .findAll({
        where: {
          UserId: req.currentUserId,
          checkout: false
        },
        include: {
          model: Product
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static getTransactions (req, res, next) {
    Cart
      .findAll({
        where: {
          UserId: req.currentUserId,
          checkout: true
        },
        include: {
          model: Product
        }
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static deleteCart (req, res, next) {
    Cart
      .destroy({
        where: {
          id: req.params.id
        }
      })
      .then(result => {
        res.status(200).json(result)
      })
      .catch(next)
  }

  static checkoutUpdate (req, res, next) {
    const { carts } = req.body
    console.log(carts)
    const err = []
    const promises = []
    let updatestock
    carts.forEach(cart => {
      if(cart.quantity >= cart.Product.stock) {
        err.push('Failed')
      } else {
        updatestock = cart.Product.stock - cart.quantity
        promises.push(
          Cart
            .update({
              checkout: true
            }, {
              where: {
                id: cart.id
              }
            }),
            Product
              .update({
                stock: updatestock
              }, {
                where: {
                  id: cart.ProductId
                }
              })
        )
      }
    })

    if ( err.length === 0 ) {
      Promise.all(promises)
        .then(result => {
          res.status(200).json({
            msg: 'Payment Success'
          })
        })
        .catch(next)
    } else {
      next({
        msg: 'Payment Error'
      })
    }
  }
}

module.exports = CartController
