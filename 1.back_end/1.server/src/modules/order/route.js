const express = require('express');
const { roleRouter, Role } = require('../../middlewares/role.js');

const serviceOrder = require("./service")

const routeOrder = express.Router()



routeOrder.get('/', serviceOrder.orderGets)

routeOrder.get('/total', serviceOrder.orderTotalTurnOver)

routeOrder.get('/total-month', serviceOrder.orderTotalTurnOverMonth)

routeOrder.get('/total-counter', serviceOrder.orderTotalCounter)

routeOrder.get('/total-counter-month', serviceOrder.orderTotalCounterMonth)

routeOrder.get('/total-turn-over-data', serviceOrder.orderTurnOverData)

routeOrder.get('/total-counter-data', serviceOrder.orderCounterData)

routeOrder.get('/total-counter-week-data', serviceOrder.orderCounterWeekData)

routeOrder.get('/total-turn-over-week-data', serviceOrder.orderTurnOverWeekData)

routeOrder.get('/status/:id', serviceOrder.existedOrder, serviceOrder.orderChangeStatus)

routeOrder.get('/:id', serviceOrder.existedOrder, serviceOrder.orderGet)

routeOrder.post('/', serviceOrder.orderPost)

routeOrder.put('/:id', serviceOrder.existedOrder, serviceOrder.orderUpdate)

routeOrder.delete('/:id', serviceOrder.existedOrder, serviceOrder.orderRemove)

module.exports = routeOrder