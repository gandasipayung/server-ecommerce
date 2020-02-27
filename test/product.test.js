const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET || 'indomie'
const createAdmin = require('../helpers/createAdmin')

describe('Product Routes Test', () => {
  let adminToken
  let userToken
  let productId

  beforeAll((done) => {
    // create admin
    createAdmin()
      .then(token => {
        adminToken = token
        let user = {
          username: 'User',
          email: 'user@mail.com',
          password: 'user123',
          isAdmin: false
        }
        return User.create(user)  
      })
      .then(user => {
        let payload = {
          id: user.id,
          username: user.username,
          email: user.email 
        }
       userToken = jwt.sign(payload, SECRET)
       done()
      })
      .catch(err => {
        done(err)
      })
    // create user
  })

  afterAll((done) => {
    queryInterface
      .bulkDelete('Users', {})
      .then(response => {
        done()
      })
      .catch(err => done(err))

    queryInterface
      .bulkDelete('Products', {})
      .then(response => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  describe('Create Product Test', () => {
    describe('Create Product Success Test', () => {
      test('it should be success and return new product data and have status 201', (done) => {
        request(app)
          .post('/products')
          .send({
            name: 'Jam Import',
            description: 'description test',
            imageUrl: 'https://freshsparks.com/wp/wp-content/uploads/2014/10/project_image_icon_TIS.jpg',
            price: 20000,
            stock: 11
          })
          .set('token', adminToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(201)
            expect(res.body.data).toHaveProperty('name', expect.any(String))
            expect(res.body.data).toHaveProperty('imageUrl', expect.any(String))
            expect(res.body.data).toHaveProperty('price', expect.any(Number))
            expect(res.body.data).toHaveProperty('stock', expect.any(Number))
            expect(res.body).toHaveProperty('msg', 'Create Product Success')
            productId = res.body.data.id
            done()
          })
      })
    })

    describe('Create Product Failed Test', () => {
      test('it should be failed and have status 400 if input is undifined', (done) => {
        request(app)
        .post('/products')
        .set('token', adminToken)
        .end((err, res) => {
          expect(err).toBe(null)
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('msg', 'Bad Request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toHaveLength(2)
          expect(res.body.errors).toEqual(expect.arrayContaining(
            ['Please enter product name', 'Image Url cannot be empty']
          ))
          done()
        })
      })

      test('it should be failed and have status 400 if input is empty string and 0 price and 0 stock', (done) => {
        request(app)
        .post('/products')
        .send({
          name: '',
          imageUrl: '',
          price: 0,
          stock: 0
        })
        .set('token', adminToken)
        .end((err, res) => {
          expect(err).toBe(null)
          expect(res.status).toBe(400)
          expect(res.body).toHaveProperty('msg', 'Bad Request')
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body).toHaveProperty('errors', expect.any(Array))
          expect(res.body.errors).toHaveLength(4)
          expect(res.body.errors).toEqual(expect.arrayContaining(
            ['Please enter product name', 'Image Url cannot be empty', 'Price minimal is 10000', 'Stock minimal is 10']
          ))
          done()
        })
      })

      test('it should be failed and have status 401 if dont have access token', (done) => {
        request(app)
        .post('/products')
        .send({
          name: 'Jam Tangan',
          description: 'description test',
          imageUrl: 'https://freshsparks.com/wp/wp-content/uploads/2014/10/project_image_icon_TIS.jpg',
          price: 10000,
          stock: 11
        })
        .end((err, res) => {
          expect(err).toBe(null)
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('msg', 'You Must Login First')
          done()
        })
      })

      test('it should be failed and have status 401 if token is not admin', (done) => {
        request(app)
        .post('/products')
        .send({
          name: 'Jam Tangan',
          description: 'description test',
          imageUrl: 'https://freshsparks.com/wp/wp-content/uploads/2014/10/project_image_icon_TIS.jpg',
          price: 10000,
          stock: 11
        })
        .set('token', userToken)
        .end((err, res) => {
          expect(err).toBe(null)
          expect(res.status).toBe(401)
          expect(res.body).toHaveProperty('msg', 'Not Authorized')
          done()
        })
      })
    })
  })

  describe('Get Product Test', () => {
    describe('Get Product Success', () => {
      test('it should be success, return products data and return status 200', (done) => {
        request(app)
          .get('/products')
          .end((err, res) => {
            expect(err).toBe(null)
            // array apa gimana
            // length berapa
            // isi produknya
            done()
          })
      })
    })
  })

  describe('Update Product Test', () => {
    describe('Update product success', () => {
      test('it should be success, and have status 200', (done) => {
        request(app)
          .put(`/products/${productId}`)
          .send({
            name: 'Jam Murah'
          })
          .set('token', adminToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.body).toHaveProperty('msg', 'Update product success')
            expect(res.body).toHaveProperty('result', expect.any(Array))
            expect(res.body.result[0]).toBe(1)
            expect(res.body).toHaveProperty('msg', 'Update product success')
            done()
          })
      })
    })

    describe('Update product failed', () => {
      test('it should be failed and return status 401 if have no token', (done) => {
        request(app)
          .put(`/products/${productId}`)
          .send({
            name: 'Harusnya gagal'
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('msg', 'You Must Login First')
            done()
          })
      })

      test('it should be failed and return status 401 if token is not admin', (done) => {
        request(app)
          .put(`/products/${productId}`)
          .send({
            name: 'Harusnya gagal'
          })
          .set('token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('msg', 'Not Authorized')
            done()
          })
      })
    })
  })
  
  describe('Delete Product Test' , () => {
    describe('Delete product success', () => {
      test('it should be success, return status 200', (done) => {
        request(app)
          .delete(`/products/${productId}`)
          .set('token', adminToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('msg', 'Delete product success')
            expect(res.body).toHaveProperty('result', expect.any(Number))
            expect(res.body.result).toBe(1)
            done()
          })
      })
    })
    
    describe('Delete product failed', () => {
      test('it should be failed, return status 401 if have no token', (done) => {
        request(app)
          .delete(`/products/${productId}`)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('msg', 'You Must Login First')
            done()
          })
      })
      
      // test.only('it should be failed, return status 401 if have no token', (done) => {
      //   request(app)
      //     .delete(`/products/abc`)
      //     .set('token', adminToken)
      //     .end((err, res) => {
      //       expect(err).toBe(null)
      //       console.log(response.body)
      //       expect(res.status).toBe(401)
      //       expect(res.body).toHaveProperty('msg', 'You Must Login First')
      //       done()
      //     })
      // })

      test('it should be failed, return status 401 if token is not admin', (done) => {
        request(app)
          .delete(`/products/${productId}`)
          .set('token', userToken)
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(401)
            expect(res.body).toHaveProperty('msg', 'Not Authorized')
            done()
          })
      })
    })
  })
})