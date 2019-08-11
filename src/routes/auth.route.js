const express = require('express')
const UserVerificationMiddleware = require('../middlewares/user.verification.middleware')
const TokenValidationMiddleware = require('../middlewares/token.validation.middleware')
const AuthController = require('../controllers/auth.controller')
const UserController = require('../controllers/user.controller')

const router = express.Router()

// =======================================================
// == Pure authentication routes
// =======================================================

// User login
router.post('/', [
  UserVerificationMiddleware.hasAuthValidFields,
  UserVerificationMiddleware.isPasswordAndUserMatch,
  UserVerificationMiddleware.isActive,
  AuthController.login
])

router.post('/logout', [
  AuthController.logout
])

// =======================================================
// == Other things related to authentication
// =======================================================

// Validation adresse mail de l'utilisatuer
router.post('/verify/email', [
  TokenValidationMiddleware.hasValidToken('EMAIL_VERIFICATION'),
  AuthController.confirmEmail
])

// Envoie d'un mail pour réinitialiser le mot de passe
router.post('/password-reset/send-mail', [
  UserVerificationMiddleware.hasExistingEmail,
  UserController.sendResetPasswordEmail
])

module.exports = router
