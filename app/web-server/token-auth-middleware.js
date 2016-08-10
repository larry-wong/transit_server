/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-06-27 18:53
#
# Description:	Route middleware to verify token.
#
=============================================================================*/

const jwt = require('jsonwebtoken');
const config = global.require('/config.json');

module.exports = (req, res, next) => {

    let token = req.query.token;
    if (!token) {
        res.status(403).json({error: 'No token provided.'});
        return;
    }
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).json({error: 'Invalid token.'});
        } else {
            req.decoded = decoded;
            next();
        }
    });
}
