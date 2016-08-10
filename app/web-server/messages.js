/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-28 11:25
#
# Description:	
#
=============================================================================*/

const express = require('express');
const tcpServer = global.require('/app/tcp-server');

const router = express.Router();

// Send message.
router.post('/', (req, res) => {
    tcpServer.handleData({
        user: {username: req.decoded.username},
        deviceId: 0
    }, req.body);
    res.json('');
});

module.exports = router;
