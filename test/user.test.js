const request = require('supertest')
const app = require('../app')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('User Routes', () => {
  afterAll((done) => {
    queryInterface
    .bulkDelete('Users', {})
    .then(response => {
      done()
    })
    .catch(err => {
      done(err)
    })
  })
  // User Register
  describe('Admin Register', () => {
    describe('Register Success Test', () => {
      test('it should return new user object and status 201', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: 'Admin',
            email: 'test@admin.com',
            password: '123456'
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(201)
            expect(res.body.data).toHaveProperty('id')
            expect(res.body.data).toHaveProperty('username', 'Admin')
            expect(res.body.data).toHaveProperty('email', 'test@admin.com')
            expect(res.body).toHaveProperty('msg', 'User register success')
            done()
          })
      })
    })
    
    describe('Register Failed Test', () => {
      test('it should be failed, return array of errors messages, and have status 400', (done) => {
        request(app)
          .post('/admin/register')
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', 'Bad Request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toHaveLength(3)
            expect(res.body.errors).toEqual(expect.arrayContaining(
              ['Please enter your username', 'Please enter your email', 'Please enter your password']
            ))
            done()
          })
      })

      test('it should be failed, return array of errors messages, and have status 400', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: '',
            email: '',
            password: ''
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', 'Bad Request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toHaveLength(3)
            expect(res.body.errors).toEqual(expect.arrayContaining(
              ['Please enter your username', 'Wrong format email', 'Password length min 5']
            ))
            done()
          })
      })


      test('it should be failed, return array with value Please enter your username and have status 400', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: null,
            email: 'test@admin.com',
            password: '123456'
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', 'Bad Request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toHaveLength(1)
            expect(res.body.errors).toEqual(expect.arrayContaining(
              ['Please enter your username']
            ))
            done()
          })     
    })

      test('it should be failed, and have status 400', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: 'admin',
            email: 'admin',
            password: '123456'
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', 'Bad Request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toHaveLength(1)
            expect(res.body.errors).toEqual(expect.arrayContaining(
              ['Wrong format email']
            ))
            done()
          })
      })

      test('it should be failed, and have status 400', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: 'admin',
            email: 'admin@admin.com',
            password: '123'
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(400)
            expect(res.body).toHaveProperty('msg', 'Bad Request')
            expect(res.body).toHaveProperty('errors', expect.any(Array))
            expect(res.body.errors).toHaveLength(1)
            expect(res.body.errors).toEqual(expect.arrayContaining(
              [ 'Password length min 5']
            ))
            done()
          })
      })

      test('it should be failed, and return status 400', (done) => {
        request(app)
          .post('/admin/register')
          .send({
            username: 'Admin',
            email: 'test@admin.com',
            password: '123456'
          })
          .end((err,  res) => {
            expect(err).toBe(null)
            expect(res.status).toEqual(400)
            expect(res.body).toHaveProperty('msg', 'Bad Request')
            expect(res.body).toHaveProperty('errors', 'email must be unique')
            done()
          })
      })
    })
  })

  // User Login
  describe('User Login', () => {    
    describe('Login Success test', () => {
      test('it should be success, return jwt token and have status 200', (done) => {
        request(app)
          .post('/login')
          .send({
            email: 'test@admin.com',
            password: '123456'
          })
          .end((err, res) => {
            expect(err).toBe(null)
            expect(res.status).toBe(200)
            expect(res.body).toHaveProperty('msg', 'Login Success')
            expect(res.body).toHaveProperty('token', expect.any(String))
            done()
          })
      })

      describe('Login Failed Test', () => {
        test('it should failed, return messages and have status 400', (done) => {
          request(app)
            .post('/login')
            .send({
              email: 'admin',
              password: '123456'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('msg', 'Wrong Email/Password !')
              done()
            })
        })

        test('it should failed, return messages and have status 400', (done) => {
          request(app)
            .post('/login')
            .send({
              email: 'test@admin.com',
              password: '123'
            })
            .end((err, res) => {
              expect(err).toBe(null)
              expect(res.status).toBe(400)
              expect(res.body).toHaveProperty('msg', 'Wrong Email/Password !')
              done()
            })
        })

      })
    })
  })
})