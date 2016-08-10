/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-19 15:26
#
# Description:	
#
=============================================================================*/

const express = require('express');
const dataService = global.require('/app/data-service');
const tcpServer = global.require('/app/tcp-server');

const router = express.Router();

// Get device list.
router.get('/', (req, res) => {
    dataService.selectDevices(req.decoded.username).then(ret => {
        if (!ret) {
            res.status(400).json({error: 'Database error.'});
        } else {

            // Online devices.
            const devices = Object.keys(
                tcpServer.getSocketMap()[req.decoded.username] || {}
            ).map(id => {
                const index = ret.findIndex(value => value.id == id);
                if (index >= 0) {
                    return Object.assign(ret[index], {isOnline: true});
                }
                return {id, name: '', isOnline: true};
            });

            // Offline ones.
            ret.forEach(device => device.isOnline || devices.push(
                Object.assign(device, {isOnline: false})
            ));

            res.json(devices);
        }
    });
});

// Edit device.
router.put('/:id', (req, res) => {
    dataService.updateDevice(
        req.decoded.username,
        req.params.id,
        req.body
    ).then(ret => {
        if (!ret) {
            res.status(400).json({error: 'Database error.'});
        } else {
            res.json(ret);
        }
    });
});

// Delete device.
router.delete('/:id', (req, res) => {
    dataService.deleteDevice(
        req.decoded.username,
        req.params.id
    ).then(ret => {
        if (!ret) {
            res.status(400).json({error: 'Database error.'});
        } else {
            res.json('');
        }
    });
});

module.exports = router;
