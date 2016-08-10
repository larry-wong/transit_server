/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-06-23 12:07
#
# Description:	Data service impleted by remote mongodb.
#
=============================================================================*/

const mongodb = require('mongodb');
const sha1 = require('sha1');
const config = global.require('/config.json');

module.exports = {

    init: _ => new Promise((resolve, reject) => {
        console.log('Connecting to mongodb...');
        mongodb.MongoClient.connect(config.MONGODB_URL, (err, db) => {
            if (err) {
                console.log('Failed to connect to mongodb!');
                reject(err);
                return;
            }
            this.users = db.collection('users');
            this.users.createIndex({username: 1}, {unique: true});
            console.log('Mongodb connected.');
            resolve();
        });
    }),

    createUser: (username, password) => new Promise((resolve, reject) => {
        if (!this.users || !username || !password) {
            resolve();
            return;
        }
        this.users.insertOne({
            username,
            password: sha1(password),
            token: sha1(`${username}${password}${+new Date()}`)
        }, (err, result) => {
            resolve(!err && result.ops[0]);
        });
    }),

    selectUser: params => new Promise((resolve, reject) => {
        let {username, token} = params || {};
        if (!this.users || !username && !token) {
            resolve();
            return;
        }
        this.users.findOne(token ? {token} : {username}, {
            _id: 0,
            username: 1,
            password: 1,
            token: 1
        }, (err, result) => {
            resolve(!err && result);
        });
    }),

    selectDevices: username => new Promise((resolve, reject) => {
        if (!this.users || !username) {
            resolve();
            return;
        }
        this.users.findOne({username}, {
            _id: 0,
            deviceMap: 1
        }, (err, result) => {
            const deviceMap = result.deviceMap || {};
            resolve(!err && Object.keys(deviceMap).map(id =>
                Object.assign(deviceMap[id], {id})));
        });
    }),

    updateDevice: (username, deviceId, updates) =>
    new Promise((resolve, reject) => {
        if (!this.users || !username || !deviceId || !updates) {
            resolve();
            return;
        }
        updates = Object.keys(updates).reduce((previous, current) => {
            (previous[`deviceMap.${deviceId}.${current}`] = updates[current])
            return previous;
        }, {});
        this.users.findOneAndUpdate({username}
            , {$set: updates}
            , {
                upsert: true
                , returnOriginal: false
                , projection: {
                    _id: 0,
                    [`deviceMap.${deviceId}`]: 1
                }
            }, (error, result) => {
                resolve(!error && result.value.deviceMap[deviceId]);
            }
        );
    }),

    deleteDevice: (username, deviceId) => new Promise((resolve, reject) => {
        if (!this.users || !username || !deviceId) {
            resolve();
            return;
        }
        this.users.findOneAndUpdate({username}
            , {$unset: {[`deviceMap.${deviceId}`]: ''}}
            , {
                projection: {
                    _id: 0,
                    [`deviceMap.${deviceId}`]: 1
                }
            }, (error, result) => {
                resolve(!error);
            }
        );
    })
};
