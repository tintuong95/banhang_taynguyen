const multer = require('multer')
const path = require('path')
const makeCode=require("../utils/makecode.js")

const storageProduct = multer.diskStorage({
    destination: function(req, file, cb) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('Only images and zip are allowed'), 'Error file type!')
        }
        cb(null, path.join(__dirname, '../../public/api/img/product'))
    },
    filename: function(req, file, cb) {
        var ext = path.extname(file.originalname)

        cb(null, makeCode(8) + ext)
    },
})

const uploadProduct = multer({ storage: storageProduct })

const storageBlog = multer.diskStorage({
    destination: function(req, file, cb) {

        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
            return cb(new Error('Only images and zip are allowed'), 'Error file type!')
        }
       cb(null, path.join(__dirname, '../../public/api/img/blog'))
    },
    filename: function(req, file, cb) {
        var ext = path.extname(file.originalname)

        cb(null, makeCode(8) + ext)
    },
})

const uploadBlog = multer({ storage: storageBlog })


module.exports = {
    uploadBlog,
    uploadProduct,
}