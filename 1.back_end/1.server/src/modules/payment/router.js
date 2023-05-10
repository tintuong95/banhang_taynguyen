
const express = require('express' );
var dateFormat = require('dateformat')
const routePayment=express.Router()
function sortObject(obj) {
  var sorted = {}
  var str = []
  var key
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}



routePayment.post('/', function (req, res, next) {
  var ipAddr =
    req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress

//   var config = require('config')
  var dateFormat = require('dateformat')

  var tmnCode = 'O551HIC7'//config.get('vnp_TmnCode')
  var secretKey = 'UUSUUPYUPNLOYXLFENXHGGIMZXPRCIXX'//config.get('vnp_HashSecret')
  var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html'// config.get('vnp_Url')
  var returnUrl = 'http://localhost:3003/thanh-toan'// config.get('vnp_ReturnUrl')

  var date = new Date()

  var createDate = Number(dateFormat(date, 'yyyymmddHHMMss'))
  var orderId = dateFormat(date, 'HHmmss')
  
  var amount =req.body.amount
  var bankCode = ""

  var orderInfo =new Date().getTime() //req.body.orderDescription
  var orderType = 100000 //req.body.orderType
  var locale = 'vn'//req.body.language
  if (locale === null || locale === '') {
    locale = 'vn'
  }
  var currCode = 'VND'
  var vnp_Params = {}
  vnp_Params['vnp_Version'] = '2.1.0'
  vnp_Params['vnp_Command'] = 'pay'
  vnp_Params['vnp_TmnCode'] = tmnCode
  // vnp_Params['vnp_Merchant'] = ''
  vnp_Params['vnp_Locale'] = locale
  vnp_Params['vnp_CurrCode'] = currCode
  vnp_Params['vnp_TxnRef'] = orderId
  vnp_Params['vnp_OrderInfo'] = orderInfo
  vnp_Params['vnp_OrderType'] = orderType
  vnp_Params['vnp_Amount'] = amount * 100
  vnp_Params['vnp_ReturnUrl'] = returnUrl
  vnp_Params['vnp_IpAddr'] = ipAddr
  vnp_Params['vnp_CreateDate'] = createDate
  if (bankCode !== null && bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode
  }

  vnp_Params = sortObject(vnp_Params)

  var querystring = require('qs')
  var signData = querystring.stringify(vnp_Params, { encode: false })
  var crypto = require('crypto')
  var hmac = crypto.createHmac('sha512', secretKey)
  var signed = hmac.update(new Buffer(signData, 'utf-8')).digest('hex')
  vnp_Params['vnp_SecureHash'] = signed
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false })

  res.status(200).json({ data: vnpUrl })
})


module.exports= routePayment;