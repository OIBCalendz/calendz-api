const express = require('express')

const JwtVerificationMiddleware = require('../../middlewares/jwt.verification.middleware')
const UserVerificationMiddleware = require('../../middlewares/user.verification.middleware')
const PermissionVerificationMiddleware = require('../../middlewares/permission.verification.middleware')
const NotificationVerificationMiddleware = require('../../middlewares/notification.verification.middleware')
const NotificationsController = require('../../controllers/notifications.controller')

const router = express.Router()

// Récupération des notifications d'un utilisateur
router.get('/:userId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.sameUserOrAdmin,
  UserVerificationMiddleware.hasValidId,
  NotificationsController.getAll
])

// Marque toutes les notifications comme "lues"
router.patch('/:userId/read/all', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.sameUserOrAdmin,
  UserVerificationMiddleware.hasValidId,
  NotificationsController.readAll
])

// Marque une notification comme "lue"
router.patch('/:userId/read/:notificationId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.sameUserOrAdmin,
  UserVerificationMiddleware.hasValidId,
  NotificationVerificationMiddleware.hasValidId,
  NotificationsController.read
])

// Marque une notification comme "non-lue"
router.patch('/:userId/unread/:notificationId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.sameUserOrAdmin,
  UserVerificationMiddleware.hasValidId,
  NotificationVerificationMiddleware.hasValidId,
  NotificationsController.unread
])

// Création d'une notification
router.post('/', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  NotificationVerificationMiddleware.hasCreateFields,
  NotificationsController.create
])

module.exports = router
