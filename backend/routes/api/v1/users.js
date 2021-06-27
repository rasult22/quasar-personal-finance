const express = require('express')
const router = express.Router()
const { createUser, updateUser, deleteUser, getUsers, getUserById, aliasTopUsers, getUserStats } = require('../../../controllers/user')

// users statistics
router.get('/userStats', getUserStats)

// Alias for top 3 users by rating 
router.get('/topUsers', aliasTopUsers, getUsers )

// Fetch all the users
router.get('/', getUsers)

// Get single user by ID
router.get('/:id', getUserById)

// Post single user
router.post('/', createUser)

// Patch request example 
router.patch('/:id', updateUser)

// DELETE request example
router.delete('/:id', deleteUser)

module.exports = router