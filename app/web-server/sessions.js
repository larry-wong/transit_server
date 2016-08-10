/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-11 10:30
#
# Description:	
#
=============================================================================*/

const express = require('express');
const sha1 = require('sha1');
const jwt = require('jsonwebtoken');
const dataService = global.require('/app/data-service');
const config = global.require('/config.json');

const router = express.Router();


// Sign in.
router.post('/', (req, res) => {

    let {username, password} = req.body;

    if (!username || !password) {
        res.status(422).json({error: 'Invalid username or password.'});
        return;
    }
    dataService.selectUser({username}).then(ret => {
        if (!ret) {
            res.status(400).json({error: 'Username does not exist.'});
        } else if (sha1(password) != ret.password) {
            res.status(400).json({error: 'Password dismatch.'});
        } else {
            res.status(201).json({
                token: jwt.sign({username}, config.JWT_SECRET, {
                    expiresIn: '7d'})
            });
        }
    });
});

module.exports = router;
