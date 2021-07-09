const express = require('express')
const router = express.Router()
const { updateMe, createUser, updateUser, deleteUser, getUsers, getUserById, aliasTopUsers, getUserStats, getMonthlyPlan } = require('../../../controllers/user')
const auth = require('../../../controllers/auth')
// users statistics
router.get('/userStats', getUserStats)

router.get('/mounthly-plan/:year', getMonthlyPlan)

// Alias for top 3 users by rating 
router.get('/topUsers', aliasTopUsers, getUsers )

// Fetch all the users
router.get('/', getUsers)

// Get single user by ID
router.get('/:id', getUserById)

// Post single user
router.post('/very-secret-route-for-creating-admin-roles', createUser)

// Signing Up
router.post('/signup', auth.signup)

router.post('/login', auth.login)

// Password manipulation
router.post('/forgotPassword', auth.forgotPassword)

router.patch('/resetPassword/:token', auth.resetPassword)

router.patch('/updateMyPassword', auth.protect, auth.updatePassword)

// Update user data (by user himself)
router.patch('/updateMe', auth.protect, updateMe)

// Patch request example 
router.patch('/:id', updateUser)

// DELETE request example
router.delete('/:id', deleteUser)

module.exports = router