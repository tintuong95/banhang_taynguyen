const express = require('express')
const { roleRouter, Role } = require('../../middlewares/role.js')

const serviceRatings = require('./service')

const routeRatings = express.Router()

routeRatings.get('/', serviceRatings.RatingsGets)

routeRatings.get('/:id', serviceRatings.existedRatings, serviceRatings.RatingsGet)

routeRatings.post('/', roleRouter([Role.User, Role.Admin]), serviceRatings.RatingsPost)

routeRatings.put(
  '/:id',
  roleRouter([Role.Admin]),
  serviceRatings.existedRatings,
  serviceRatings.RatingsUpdate
)

routeRatings.delete(
  '/:id',
  roleRouter([Role.Admin]),
  serviceRatings.existedRatings,
  serviceRatings.RatingsRemove
)

module.exports = routeRatings
