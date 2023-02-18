const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')

const helper = require('../helpers/test.helper')
const authHelper = require('../helpers/auth.helper')
const userHelper = require('../helpers/user.helper')

describe('./routes/notifications.route', () => {
  // ===================================================================
  // == GET /v1/notifications/:userId - get user's notifications
  // ===================================================================
  describe(`GET /v1/notifications/:userId - get user's notifications`, () => {
    authHelper.requireAuth('get', '/v1/notifications/5d4f26aa046ad506f9583bd3')
    authHelper.requireAdminOrSameUser('get', '/v1/notifications/5d4f26aa046ad506f9583bd3')
    userHelper.userNotFound('get', '/v1/notifications/5d4f26aa046ad506f9583bc9')

    it('should fail (422) : ID is not an ObjectID', (done) => {
      request(app).get('/v1/notifications/azeazeaze').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `ID is not a valid ObjectID`)
          done()
        })
    })

    it('should success (200) : récupération des notifications', (done) => {
      request(app).get('/v1/notifications/5d4f26aa046ad506f9583bd3').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.notifications)
          assert.isArray(res.body.notifications)
          done()
        })
    })
  })

  // ========================================================================================
  // == PATCH /v1/notifications/:userId/read/all - read all user's notifications
  // ========================================================================================
  describe(`PATCH /v1/notifications/:userId/read/all - read all notifications`, () => {
    authHelper.requireAuth('patch', '/v1/notifications/5d4f26aa046ad506f9583bd3/read/all')
    authHelper.requireAdminOrSameUser('patch', '/v1/notifications/5d4f26aa046ad506f9583bd3/read/all')
    userHelper.userNotFound('patch', '/v1/notifications/5d4f26aa046ad506f9583bc9/read/all')

    it('should success (200) : notifications lues', (done) => {
      request(app).patch('/v1/notifications/5d4f26aa046ad506f9583bd3/read/all').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ==========================================================================================
  // == PATCH /v1/notifications/:userId/read/:notificationId - mark a notification as read
  // ==========================================================================================
  describe(`PATCH /v1/notifications/:userId/read/:notificationId - read a notification`, () => {
    authHelper.requireAuth('patch', '/v1/notifications/5d4f26aa046ad506f9583bd3/read/5d4f26aa246ad506f9583bd1')
    authHelper.requireAdminOrSameUser('patch', '/v1/notifications/5d4f26aa046ad506f9583bd3/read/5d4f26aa246ad506f9583bd1')

    it('should fail (422) : invalid notification id', (done) => {
      request(app).patch('/v1/notifications/invalidid/read/5d4f26aa246ad506f9583bd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `ID is not a valid ObjectID`)
          done()
        })
    })

    userHelper.userNotFound('patch', '/v1/notifications/5d4f26aa046ad506f9583bc9/read/5d4f26aa246ad506f9583bd1')

    it('should fail (422) : invalid notification id', (done) => {
      request(app).patch('/v1/notifications/5d4f26aa046ad506f9583bd3/read/invalidid').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(422)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `ID is not a valid ObjectID`)
          done()
        })
    })

    it('should fail (404) : notification not found', (done) => {
      request(app).patch('/v1/notifications/5d4f26aa046ad506f9583bd3/read/5d4f26aa246ad506f9583cd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Cette notification n'existe pas`)
          done()
        })
    })

    it('should success (200) : notification lue', (done) => {
      request(app).patch('/v1/notifications/5d4f26aa046ad506f9583bd3/read/5d4f26aa246ad506f9583bd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ===============================================================================================
  // == PATCH /v1/notifications/:userId/read/:notificationId - mark a notification as not read
  // ===============================================================================================
  describe(`PATCH /v1/notifications/:userId/read/:notificationId - unread a notification`, () => {
    authHelper.requireAuth('patch', '/v1/notifications/5d4f26aa046ad506f9583bd3/unread/5d4f26aa246ad506f9583bd1')
    authHelper.requireAdminOrSameUser('patch', '/v1/notifications/5d4f26aa046ad506f9583bd3/unread/5d4f26aa246ad506f9583bd1')
    userHelper.userNotFound('patch', '/v1/notifications/5d4f26aa046ad506f9583bc9/unread/5d4f26aa246ad506f9583bd1')

    it('should fail (404) : notification not found', (done) => {
      request(app).patch('/v1/notifications/5d4f26aa046ad506f9583bd3/unread/5d4f26aa246ad506f9583cd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Cette notification n'existe pas`)
          done()
        })
    })

    it('should success (200) : notification non-lue', (done) => {
      request(app).patch('/v1/notifications/5d4f26aa046ad506f9583bd3/unread/5d4f26aa246ad506f9583bd1').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ==========================================================
  // == POST /v1/notifications - create some notifications
  // ==========================================================
  describe(`POST /v1/notifications - create some notifications`, () => {
    const title = 'Un titre'
    const target = ['all']
    const message = 'Un message'
    const icon = 'fas fa-fire'
    const type = 'gradient-danger'

    authHelper.requireAuth('post', '/v1/notifications', { title, target, message, icon, type })
    authHelper.requireAdmin('post', '/v1/notifications', { title, target, message, icon, type })

    it('should fail (412) : missing title', (done) => {
      request(app).post('/v1/notifications').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ target, message, icon, type })
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un titre')
          done()
        })
    })

    it('should fail (412) : missing target', (done) => {
      request(app).post('/v1/notifications').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, message, icon, type })
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer une cible')
          done()
        })
    })

    it('should fail (412) : missing message', (done) => {
      request(app).post('/v1/notifications').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, target, icon, type })
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un message')
          done()
        })
    })

    it('should fail (412) : missing icon', (done) => {
      request(app).post('/v1/notifications').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, target, message, type })
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un icône')
          done()
        })
    })

    it('should fail (412) : missing type', (done) => {
      request(app).post('/v1/notifications').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, target, message, icon })
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, 'Certains champs requis sont manquant')
          helper.hasBodyErrorsThatContains(res.body, 'Veuillez indiquer un type')
          done()
        })
    })

    it('should success (201) : notifications created', (done) => {
      request(app).post('/v1/notifications').set(helper.defaultSetsWithAccess).expect('Content-Type', /json/)
        .send({ title, target, message, icon, type })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })
})
