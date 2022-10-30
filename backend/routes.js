const knex = require('./knex/knex.js');

module.exports = (function () {
    'use strict';
    var apiRoutes = require('express').Router();

    function getDateString(date) {
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
    }

    const unAuthorizedResponse = function (res) {
        return res.status(403).
            json({ success: false, message: 'Unauthorized' });
    };

    apiRoutes.post('/posts', function (req, res) {
        const decodedToken = req.decodedToken;

        if (req.body.post_title && req.body.post_description && req.body.post_date) {
            knex('posts').insert({
                post_title: req.body.post_title,
                post_description: req.body.post_description,
                post_date: req.body.post_date,
                user_id: decodedToken.id
            }).then(function (rows) {
                res.send({
                    success: true
                })
            }).catch(function (err) {
                res.send({
                    success: false
                })
            })
        }
    })

    apiRoutes.get('/posts', function (req, res) {
        const decodedToken = req.decodedToken;

        knex.select('*').from('posts')
            .where('user_id', '=', decodedToken.id).orderBy('post_date', 'desc')
            .then(function (rows) {
                return res.send({
                    posts: rows,
                    success: true
                })
            }).catch(function (err) {
                res.send({
                    success: false
                })
            })
    })

    apiRoutes.put('/posts/:post_id', function (req, res) {
        const decodedToken = req.decodedToken;
        knex.table('posts').update({
            post_title: req.body.post_title,
            post_description: req.body.post_description,
            post_date: req.body.post_date
        }).where('id', '=', req.params.post_id).where('user_id', '=', decodedToken.id)
            .then(function (res1) {
                if (!res1) {
                    return unAuthorizedResponse(res)
                } else {
                    return res.send({
                        response: res1,
                        success: true
                    })
                }
            }).catch(function (err) {
                return res.send({
                    success: false
                })
            })
    })

    apiRoutes.delete('/posts/:post_id', function (req, res) {
        const decodedToken = req.decodedToken;
        knex.table('posts')
            .where('id', '=', req.params.post_id).where("user_id", "=", decodedToken.id)
            .del().then(function (res1) {
                if(res1){
                    return unAuthorizedResponse(res)
                }
                return res.send({
                    success: true,
                    response: res1
                })
            }).catch(function (err) {
                return res.send({
                    success: false
                })
            })
    })

    return apiRoutes;
})();