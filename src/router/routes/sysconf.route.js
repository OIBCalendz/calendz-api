const express = require('express')

const JwtVerificationMiddleware = require('../../middlewares/jwt.verification.middleware')
const PermissionVerificationMiddleware = require('../../middlewares/permission.verification.middleware')
const ValueVerificationMiddleware = require('../../middlewares/value.verification.middleware')
const SysconfController = require('../../controllers/sysconf.controller')

const router = express.Router()

// Get all system settings
router.get('/settings', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  SysconfController.getSettings
])

// Calculate & return some statistics
router.get('/stats', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  SysconfController.getStats
])

// Toggle login state
router.patch('/settings/login-enabled/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  ValueVerificationMiddleware.isBoolean,
  SysconfController.toggleLogin
])

// Toggle register state
router.patch('/settings/register-enabled/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  ValueVerificationMiddleware.isBoolean,
  SysconfController.toggleRegister
])

// Toggle register state
router.patch('/settings/edit-group-enabled/:value', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  ValueVerificationMiddleware.isBoolean,
  SysconfController.toggleEditGroup
])

// Delete all refresh tokens (disconnects all users)
router.delete('/refresh-tokens/all', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  SysconfController.deleteAllRefreshTokens
])

// Start accounts migration
router.patch('/migrate/all', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  SysconfController.migrateAllAccounts
])

router.post('/mail', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  SysconfController.sendMail
])

// Delete all tasks
router.delete('/tasks/all', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  SysconfController.deleteAllTasks
])

// Delete all grades
router.delete('/grades/all', [
  JwtVerificationMiddleware.hasValidAccessOrRefreshToken,
  PermissionVerificationMiddleware.isAdmin,
  SysconfController.deleteAllGrades
])

module.exports = router
