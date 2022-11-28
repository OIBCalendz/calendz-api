const express = require('express')

const UserController = require('../../controllers/user.controller')
const UserVerificationMiddleware = require('../../middlewares/user.verification.middleware')
const TokenValidationMiddleware = require('../../middlewares/token.validation.middleware')
const JwtVerificationMiddleware = require('../../middlewares/jwt.verification.middleware')
const ValueVerificationMiddleware = require('../../middlewares/value.verification.middleware')
const PermissionVerificationMiddleware = require('../../middlewares/permission.verification.middleware')
const SysconfVerificationMiddleware = require('../../middlewares/sysconf.verification.middleware')

const router = express.Router()

// Inscription d'un utilisateur
router.post('/', [
  UserController.create
])

// Account migration
router.post('/migrate', [
  TokenValidationMiddleware.hasValidToken('ACCOUNT_MIGRATION'),
  UserVerificationMiddleware.hasValidMigrationFields,
  UserController.migrate
])

// Fetch current user's data
router.get('/fetch', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  UserController.fetch
])

// Get all users
router.get('/all', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  UserController.getAll
])


// Changement champ bts utilisateur
router.patch('/profile', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  SysconfVerificationMiddleware.isEditGroupEnabled,
  UserController.updateProfile
])

// Changement du mot de passe utilisateur
router.patch('/password', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  UserVerificationMiddleware.hasValidPasswordAndPasswordConfirmation,
  UserController.changePasswordUser
])

// Changement avatar utilisateur
router.patch('/avatar', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  UserVerificationMiddleware.hasValidAvatarUrl,
  UserController.changeAvatar
])

// Actualisation des information d'un utilisateur
router.patch('/:userId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  UserVerificationMiddleware.hasValidId,
  UserVerificationMiddleware.hasValidModifyFields,
  UserController.updateUserInformations
])

// Suppression de son compte
router.delete('/', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  UserController.delete
])

// Suppression d'un compte utilisateur
router.delete('/:userId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  UserVerificationMiddleware.hasValidId,
  UserVerificationMiddleware.isNotSelf,
  UserController.deleteAccount
])

// Fetch user by its id
router.get('/:userId', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  UserController.getById
])

// ===========================================
// == Paramètres =============================
// ===========================================

// Toggle l'adhésion aux mails d'informations
router.patch('/information-mails/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  ValueVerificationMiddleware.isBoolean,
  UserController.setInformationMails
])

// Toggle l'adhésion aux mails création de tâches
router.patch('/settings/mail-task-create/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  ValueVerificationMiddleware.isBoolean,
  UserController.setMailTaskCreate
])

// Changement de la couleur de l'emploi du temps de l'utilisateur
router.patch('/calendar-color/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  ValueVerificationMiddleware.isValidHexColor,
  UserController.setCalendarColor
])

module.exports = router
