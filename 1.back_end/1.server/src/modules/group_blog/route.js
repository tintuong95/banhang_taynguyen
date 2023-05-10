const express = require('express');

const serviceGroupBlog = require("./service")

const routeGroupBlog = express.Router()

routeGroupBlog.get('/', serviceGroupBlog.groupBlogGets)

routeGroupBlog.get('/:id', serviceGroupBlog.existedGroupBlog, serviceGroupBlog.groupBlogGet)

routeGroupBlog.post('/', serviceGroupBlog.groupBlogPost)

routeGroupBlog.put('/:id', serviceGroupBlog.existedGroupBlog, serviceGroupBlog.groupBlogUpdate)

routeGroupBlog.delete('/:id', serviceGroupBlog.existedGroupBlog, serviceGroupBlog.groupBlogRemove)

module.exports = routeGroupBlog