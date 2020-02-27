'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Product extends Model{
    static associate (models) {
      Product.hasMany(models.Cart)
      Product.belongsTo(models.Category)
    }
  }

  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Please enter product name'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter product name'
        }
      }
    },
    description: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Image Url cannot be empty'
        },
        notEmpty: {
          args: true,
          msg: 'Image Url cannot be empty'
        }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Price must be a number'
        },
        min: {
          args: 10000,
          msg: 'Price minimal is 10000'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          args: true,
          msg: 'Stock must be a number'
        },
        min: {
          args: 10,
          msg: 'Stock minimal is 10'
        }
      }
    },
    CategoryId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  })

  return Product;
};