const assert = require('chai').assert
const mongoose = require('mongoose')
const Notification = require('../../models/notification.model')
const NotificationsService = require('../../services/notifications.service')

describe('./services/notification.service', () => {
  const user = '5d4f26aa046ad506f9583bd3'
  const users = ['5d4f26aa046ad506f9583bd3']
  const target = ['all']
  const title = 'Le titre'
  const message = 'Un message'
  const icon = 'fas fa-user'
  const type = 'gradient-primary'
  const timestamp = String(Date.now())
  const isRead = false
  let notificationId

  // ===============================================
  // == Methods
  // ===============================================
  describe('#create', () => {
    it('should create a notification', (done) => {
      NotificationsService.create(user, title, message, icon, type, timestamp, isRead).then(notif => {
        assert.strictEqual(notif.title, title)
        assert.strictEqual(notif.message, message)
        assert.strictEqual(notif.icon, icon)
        assert.strictEqual(notif.type, type)
        assert.strictEqual(notif.timestamp, timestamp)
        assert.strictEqual(notif.isRead, isRead)
        assert.isTrue(notif._id instanceof mongoose.mongo.ObjectID)
        assert.isTrue(notif.user instanceof mongoose.mongo.ObjectID)
        notificationId = notif._id
        done()
      }).catch(err => done(err))
    })
  })

  describe('#createMany', () => {
    it('should create a notification for many users', (done) => {
      NotificationsService.createMany(users, title, message, icon, type).then(() => {
        done()
      }).catch(err => done(err))
    })
  })

  describe('#createForAll', () => {
    it('should create a notification for every users', (done) => {
      NotificationsService.createForAll(title, target, message, icon, type).then(() => {
        done()
      }).catch(err => done(err))
    })
  })

  describe('#findOne', () => {
    it('should get a notification by its id', (done) => {
      NotificationsService.findOne({ _id: notificationId }).then(notif => {
        assert.strictEqual(notif.title, title)
        assert.strictEqual(notif.message, message)
        assert.strictEqual(notif.icon, icon)
        assert.strictEqual(notif.timestamp, timestamp)
        assert.strictEqual(notif.isRead, isRead)
        assert.isTrue(notif._id instanceof mongoose.mongo.ObjectID)
        assert.isTrue(notif.user instanceof mongoose.mongo.ObjectID)
        done()
      })
    })
  })

  describe('#findOneAndUpdate', () => {
    it('should update notification', (done) => {
      NotificationsService.findOneAndUpdate({ _id: notificationId }, { isRead: true }).then(() => {
        Notification.findById(notificationId).then(notif => {
          assert.isTrue(notif.isRead)
          done()
        })
      })
    })
  })

  describe('#findAllAndUpdate', () => {
    it(`should update all user's notifications`, (done) => {
      NotificationsService.findAllAndUpdate({ user: user }, { isRead: true }).then(() => {
        Notification.find({ user: user }).then(notifs => {
          notifs.forEach(notif => {
            assert.isTrue(notif.isRead)
          })
          done()
        })
      })
    })
  })

  describe('#getAllFrom', () => {
    it('should get notifications of user', (done) => {
      NotificationsService.getAllFrom(user).then(notifs => {
        assert.isDefined(notifs)
        assert.isArray(notifs)
        done()
      }).catch(err => done(err))
    })
  })
})
