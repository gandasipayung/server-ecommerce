'use strict';
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Cart)
    }
  }
  
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args : true,
          msg: 'Please enter your username'
        },
        notEmpty: {
          args: true,
          msg: 'Please enter your username'
        }
      }
    },
    email: {
      type:  DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Please enter your email'
        },
        isEmail: {
          args: true,
          msg: 'Wrong format email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Please enter your password'
        },
        len: {
          args: [5],
          msg: 'Password length min 5'
        }
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  },{
    sequelize,
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
      }
    }
  })

  return User
}