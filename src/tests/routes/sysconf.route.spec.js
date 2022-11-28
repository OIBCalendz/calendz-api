const assert = require('chai').assert
const request = require('supertest')
const app = require('../../app')

const helper = require('../helpers/test.helper')
const authHelper = require('../helpers/auth.helper')

describe('./routes/sysconf.route', () => {
  // ===============================================
  // == GET /v1/sysconf/settings - get settings
  // ===============================================
  describe('GET /v1/sysconf/settings - get settings', async () => {
    authHelper.requireAuth('get', '/v1/sysconf/settings')

    it('should success (200) : got settings', (done) => {
      request(app).get('/v1/sysconf/settings').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.loginEnabled)
          assert.isDefined(res.body.registerEnabled)
          assert.isBoolean(res.body.loginEnabled)
          assert.isBoolean(res.body.registerEnabled)
          done()
        })
    })
  })

  // ===============================================
  // == GET /v1/sysconf/stats - get stats
  // ===============================================
  describe('GET /v1/sysconf/stats - get stats', async () => {
    authHelper.requireAuth('get', '/v1/sysconf/stats')
    authHelper.requireAdmin('get', '/v1/sysconf/stats')

    it('should success (200) : got stats', (done) => {
      request(app).get('/v1/sysconf/stats').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          assert.isDefined(res.body.stats)
          assert.isDefined(res.body.stats.users)
          assert.isDefined(res.body.stats.users.users)
          assert.isDefined(res.body.stats.users.users.total)
          assert.isDefined(res.body.stats.users.users.inactive)
          assert.isDefined(res.body.stats.users.users.mailing)
          assert.isDefined(res.body.stats.users.users.bts)
          assert.isDefined(res.body.stats.users.users.epsi)
          assert.isDefined(res.body.stats.users.users.wis)
          assert.isDefined(res.body.stats.users.users.migrated)
          assert.isDefined(res.body.stats.users.users.neverMigrated)
          assert.isDefined(res.body.stats.users.users.lastRegisters)
          assert.isDefined(res.body.stats.users.grades)
          assert.isDefined(res.body.stats.users.cities)
          done()
        })
    })
  })

  // ==========================================================================
  // == PATCH /v1/sysconf/settings/login-enabled/:value - update login-enabled
  // ==========================================================================
  describe('PATCH /v1/sysconf/settings/login-enabled/:value - update login-enabled', async () => {
    authHelper.requireAuth('patch', '/v1/sysconf/settings/login-enabled/false')
    authHelper.requireAdmin('patch', '/v1/sysconf/settings/login-enabled/false')

    it('should fail (412) : value is not a boolean', (done) => {
      request(app).patch('/v1/sysconf/settings/login-enabled/azeaze').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Veuillez spécifier une valeur`)
          done()
        })
    })

    it('should success (200) : login-enabled is now false', (done) => {
      request(app).patch('/v1/sysconf/settings/login-enabled/false').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should success (200) : login-enabled is now true', (done) => {
      request(app).patch('/v1/sysconf/settings/login-enabled/true').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ==========================================================================
  // == PATCH /v1/sysconf/settings/register-enabled/:value - update register-enabled
  // ==========================================================================
  describe('PATCH /v1/sysconf/settings/register-enabled/:value - update register-enabled', async () => {
    authHelper.requireAuth('patch', '/v1/sysconf/settings/register-enabled/false')
    authHelper.requireAdmin('patch', '/v1/sysconf/settings/register-enabled/false')

    it('should fail (412) : value is not a boolean', (done) => {
      request(app).patch('/v1/sysconf/settings/register-enabled/azeaze').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Veuillez spécifier une valeur`)
          done()
        })
    })

    it('should success (200) : register-enabled is now false', (done) => {
      request(app).patch('/v1/sysconf/settings/register-enabled/false').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should success (200) : register-enabled is now true', (done) => {
      request(app).patch('/v1/sysconf/settings/register-enabled/true').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ====================================================================================
  // == PATCH /v1/sysconf/settings/edit-group-enabled/:value - update edit-group-enabled
  // ====================================================================================
  describe('PATCH /v1/sysconf/settings/edit-group-enabled/:value - update edit-group-enabled', async () => {
    authHelper.requireAuth('patch', '/v1/sysconf/settings/edit-group-enabled/false')
    authHelper.requireAdmin('patch', '/v1/sysconf/settings/edit-group-enabled/false')

    it('should fail (412) : value is not a boolean', (done) => {
      request(app).patch('/v1/sysconf/settings/edit-group-enabled/azeaze').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(412)
        .end((err, res) => {
          if (err) return done(err)
          helper.hasBodyMessage(res.body, `Veuillez spécifier une valeur`)
          done()
        })
    })

    it('should success (200) : edit-group-enabled is now false', (done) => {
      request(app).patch('/v1/sysconf/settings/edit-group-enabled/false').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })

    it('should success (200) : edit-group-enabled is now true', (done) => {
      request(app).patch('/v1/sysconf/settings/edit-group-enabled/true').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ==========================================================================
  // == DELETE /v1/sysconf/refresh-tokens/all - delete all refresh tokens
  // ==========================================================================
  describe('DELETE /v1/sysconf/refresh-tokens/all - delete all refresh tokens', async () => {
    authHelper.requireAuth('delete', '/v1/sysconf/refresh-tokens/all')
    authHelper.requireAdmin('delete', '/v1/sysconf/refresh-tokens/all')

    it('should success (200) : deleted all refresh tokens', (done) => {
      request(app).delete('/v1/sysconf/refresh-tokens/all').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ==========================================================================
  // == PATCH /v1/sysconf/migrate/all - migrate all users account
  // ==========================================================================
  describe('PATCH /v1/sysconf/migrate/all - migrate all users account', async () => {
    authHelper.requireAuth('patch', '/v1/sysconf/migrate/all')
    authHelper.requireAdmin('patch', '/v1/sysconf/migrate/all')

    it('should success (200) : deleted all refresh tokens', (done) => {
      request(app).patch('/v1/sysconf/migrate/all').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          done()
        })
    })
  })

  // ==========================================================================
  // == DELETE /v1/sysconf/grades/all - delete all grades
  // ==========================================================================
  // describe('DELETE /v1/sysconf/grades/all - delete all grades', async () => {
  //   authHelper.requireAuth('delete', '/v1/sysconf/grades/all')
  //   authHelper.requireAdmin('delete', '/v1/sysconf/grades/all')

  //   it('should success (200) : deleted all grades', (done) => {
  //     request(app).delete('/v1/sysconf/grades/all').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) return done(err)
  //         done()
  //       })
  //   })
  // })

  // ==========================================================================
  // == DELETE /v1/sysconf/tasks/all - delete all tasks
  // ==========================================================================
  // describe('DELETE /v1/sysconf/tasks/all - delete all tasks', async () => {
  //   authHelper.requireAuth('delete', '/v1/sysconf/tasks/all')
  //   authHelper.requireAdmin('delete', '/v1/sysconf/tasks/all')

  //   it('should success (200) : deleted all tasks', (done) => {
  //     request(app).delete('/v1/sysconf/tasks/all').set(helper.defaultSetsWithAccessAdmin).expect('Content-Type', /json/)
  //       .expect(200)
  //       .end((err, res) => {
  //         if (err) return done(err)
  //         done()
  //       })
  //   })
  // })
})
