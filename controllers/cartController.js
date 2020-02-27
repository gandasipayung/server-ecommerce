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
}

module.exports = CartController
