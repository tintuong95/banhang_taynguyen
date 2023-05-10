

const e = require('express')
const useQuery= require('../../utils/query.js')
const Product = require('../product/model.js')
const User = require('../user/model.js')
const Ratings = require('./model.js')

//check existed

async function existedRatings(req, res, next) {
  try {
    const { id } = req.params

    const response = await Ratings.findOne({
      where: { id },
    })

    if (response) {
      res.locals.response = await response
      next()
      return
    }
    return res.sendStatus(404)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//post
async function RatingsPost(req, res) {
  try {
    const { idProduct, idUser }=req.body
    
    const response =await Ratings.findOne({
      where:{
        idProduct,
        idUser
      }
    })
    if (response){
      return res.sendStatus(503)
    }else{
      await Ratings.create(req.body)
      return res.sendStatus(201)
    }
    
  
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//get
async function RatingsGet(req, res) {
  try {
    res.status(200).json({ data: res.locals.response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//gets
async function RatingsGets(req, res) {
  try {
   
    const {offset=0,limit=12}=req.query
    let {where,order}= useQuery(req)
  
    const response = await Ratings.findAll({
      where,
      offset: Number(offset),
      limit: Number(limit),
      order: [...order],
      include: [
        {
          model: User,
          as: 'UserRatings',
          attributes: ['id', 'username'],
        },
        {
          model: Product,
          as: 'ProductRatings',
          attributes: ['id', 'title'],
        },
      ],
    })

    res.status(200).json({ data: response })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//update
async function RatingsUpdate(req, res) {
  try {
    res.locals.response.update(req.body)
    res.locals.response.save()
    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}

//remove
async function RatingsRemove(req, res) {
  try {
    res.locals.response.destroy()

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
}
module.exports = {
  existedRatings,
  RatingsPost,
  RatingsGet,
  RatingsGets,
  RatingsUpdate,
  RatingsRemove,
}
