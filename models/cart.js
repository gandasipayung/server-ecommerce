'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  
  class Cart extends Model {
    static associate (models) {
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  }

  Cart.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    checkout: DataTypes.BOOLEAN
  },{
    sequelize
  })
  
  return Cart
};