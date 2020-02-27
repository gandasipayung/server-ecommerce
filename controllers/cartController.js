const { Cart, Product, User, sequelize } = require('../models')

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
      .then(carts => {
        return sequelize.transaction((t) => {
          const promises = []
          let updatestock
          for (let i = 0; i < carts.length; i++) {
            if(carts[i].quantity > carts[i].Product.stock) {
              throw new Error ()
            } else {
              updatestock = carts[i].Product.stock - carts[i].quantity
              promises.push(
                Cart.update({ checkout: true }, { where: { id: carts[i].id }, transaction: t }),
                Product.update({ stock: updatestock }, { where: { id: carts[i].ProductId }, transaction: t })
              )
            }
          }
          return Promise.all(promises)
        })
      })
      .then(result => {
        res.status(200).json({
          msg: 'Transaction Success'
        })
      })
      .catch(next)
  }
}

module.exports = CartController
