const express = require('express')
const router = express.Router()
const { createUser, updateUser, deleteUser, getUsers, getUserById, aliasTopUsers, getUserStats, getMonthlyPlan } = require('../../../controllers/user')
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
router.post('/', createUser)

// Signing Up
router.post('/signup', auth.signup)

// Patch request example 
router.patch('/:id', updateUser)

// DELETE request example
router.delete('/:id', deleteUser)

module.exports = router