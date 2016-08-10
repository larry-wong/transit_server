/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-10 19:36
#
# Description:	
#
=============================================================================*/

const express = require('express');
const dataService = global.require('/app/data-service');
const tokenAuthMiddleware = require('./token-auth-middleware');

const router = express.Router();


// Sign up.
router.post('/', (req, res) => {

    let {username, password} = req.body;

    if (!username || !password) {
        res.status(422).json({error: 'Invalid username or password.'});
        return;
    }
    dataService.createUser(username, password).then(ret => {
        if (ret) {

            // We should not return the password back.
            delete ret.password;
            res.status(201).json(ret);
        }
        else res.status(400).json({error: 'Username exists.'});
    });
});

// Get user info. Must be authenticated, & only current user returned.
router.get('/', tokenAuthMiddleware, (req, res) => {
    dataService.selectUser({username: req.decoded.username}).then(ret => {

        // In case the use has been removed.
        if (!ret) {
            res.status(400).json({error: 'No such user.'});
        } else {

            // We should not return the password back.
            delete ret.password;
            res.json([ret]);
        }
    });
});

module.exports = router;
