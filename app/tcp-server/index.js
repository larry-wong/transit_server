/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-06-23 12:09
#
# Description:	Tcp server.
#
=============================================================================*/

const net = require('net');
const CMD = require('./cmd');
const config = global.require('/config.json');
const DataService = global.require('/app/data-service');

/*
 * A central map to maintain sockets. Looks like:
 * -----------------------------------------
 * |             |  deviceId1  |  socket1  |
 * |  username1  |-------------------------|
 * |             |  deviceId2  |  socket2  |
 * |---------------------------------------|
 * |             |  deviceId3  |  socket3  |
 * |             |-------------------------|
 * |  username2  |  deviceId4  |  socket4  |
 * |             |-------------------------|
 * |             |  deviceId5  |  socket5  |
 * -----------------------------------------
 */
const socketMap = {};

// Function to wrap msg sent by server.
const wrapMsg = (cmd, msg = '') => {
    let buffer = new Buffer(msg);

    // Prepend head to msg.
    let ret = Buffer.concat([new Buffer(2), buffer]);

    // Write cmd, we don't care from_device_id.
    ret.writeUInt8(cmd << 5);

    // Write msg body length.
    ret.writeUInt8(buffer.length, 1);
    return ret;
};

// Called when a new client comes.
const initClient = socket => {

    // If no auth msg received in 3s, shut it down.
    socket.authTimeout = setTimeout(_ => {

        // Before destroy the socket, tell client the reason.
        socket.write(wrapMsg(CMD.AUTH_FAIL, 'Auth timeout!')
            , socket.destroy.bind(socket));
    }, 3e3);

    socket.on('data', data => resolveData(socket, data));
    socket.on('close', had_error => deleteSocket(socket));
};

// Called when msg comes from a client.
const resolveData = (socket, dataBuffer) => {
    if (!dataBuffer.length) return;

    // A single msg may be divided to parts.
    // In that case, we store them to cache.
    // So checking whether there is cached data is necessary.
    if (socket.cachedData) {

        // Prepend the cached data to dataBuffer.
        dataBuffer = Buffer.concat([socket.cachedData, dataBuffer]);
    }

    // A complete msg has 2 bytes at least.
    if (dataBuffer.length < 2) {
        socket.cachedData = dataBuffer;
    } else {
        let bufferSize = dataBuffer.readUInt8(1) + 2;

        // This msg is not complete, we store it to buffer.
        if (bufferSize < dataBuffer.length) {
            socket.cachedData = dataBuffer;

        // This msg is exactly what we need.
        } else if (bufferSize === dataBuffer.length) {
            handleData(socket, dataBuffer);
            delete socket.cachedData;

        // More than we expcted, slice what we need and loop the rest.
        } else {
            handleData(socket, dataBuffer.slice(0, bufferSize));
            delete socket.cachedData;
            resolveData(socket, dataBuffer.slice(bufferSize));
        }
    }
};

// Single complete msg got, let's do something.
const handleData = (socket, dataBuffer) => {
    let msgInfo = dataBuffer.readUInt8(0),
        cmd = msgInfo >> 5,
        deviceId = msgInfo & 0b11111;

    // No msg should been handled before auth msg.
    if (socket.authTimeout && cmd !== CMD.AUTH_SEND) {
        socket.write(wrapMsg(CMD.AUTH_FAIL, 'Please send auth msg first!'));
        return;
    }

    switch (cmd) {

        // Auth msg received from client, we verify it by data service.
        case CMD.AUTH_SEND:

            // Each socket should be authed only once,
            // no matter whether it succeeds.
            // So we clean the timeout.
            clearTimeout(socket.authTimeout);
            delete socket.authTimeout;

            // Verify the token.
            DataService.selectUser({
                token: dataBuffer.toString('utf8', 2)
            }).then(user => {

                // Valid token, we save this socket to socketMap.
                if (user) {
                    saveSocket(user, deviceId, socket);
                    socket.write(wrapMsg(CMD.AUTH_SUCC));

                // Invalid token, we destroy the socket.
                } else {
                    socket.write(wrapMsg(CMD.AUTH_FAIL, 'Invalid token!')
                        , socket.destroy.bind(socket));
                }
            });
            break;

        // Transmit msg received from client.
        case CMD.MSG_SEND:
            let targetSocket = getSocket(socket.user, deviceId);
            if (!targetSocket || targetSocket.authTimeout) return;

            // Set from_device_id & send it.
            dataBuffer.writeUInt8(CMD.MSG_RECE << 5 | socket.deviceId);
            targetSocket.write(dataBuffer);
            break;
        default:
            break;
    }
};

// Save a socket to socketMap.
const saveSocket = (user, deviceId, socket) => {

    // We expect username && deviceId at least.
    if (!user || !user.username || deviceId == undefined) return;

    // If it's this user's first socket, put an empty {} in socketMap.
    let map = socketMap[user.username] || (socketMap[user.username] = {});

    // If another socket exists, tell it & destroy it.
    let currentSocket = map[deviceId];
    if (currentSocket && currentSocket != socket) {
        currentSocket.write(wrapMsg(CMD.AUTH_FAIL
            , 'Another socket comes with same deviceId.')
            , currentSocket.destroy.bind(currentSocket));
        currentSocket.destroy();

    // If this socket already exists(someone sent the auth msg more than once),
    // we do nothing.
    } else if (currentSocket && currentSocket == socket) {
        return;
    }

    // Save this socket to map.
    map[deviceId] = socket;

    // Save user info & deviceId.
    socket.user = user;
    socket.deviceId = deviceId;
};

// Delete a socket from socketMap.
const deleteSocket = (socket) => {

    let {user, deviceId} = socket;

    // We expect user and deviceId saved to this socket.
    if (!user || !deviceId) return;

    // Do the deletion.
    let map = socketMap[user.username];
    (map[deviceId] == socket) && delete map[deviceId];

    // If the map is empty, delete it, too.
    Object.keys(map).length || delete socketMap[user.username];
}


// Get specific socket from socketMap.
const getSocket = (user, deviceId) => {
    return (socketMap[(user || {}).username] || {})[deviceId];
}

module.exports = {

    init: _ => {

        // Init the tcp server.
        let tcpServer = net.createServer(socket => initClient(socket))
        .listen(config.TCP_PORT || 1988, '127.0.0.1', _ => {
            let address = tcpServer.address();
            console.log(`Tcp server ls listening on ${address.address}:${address.port}...`);
        });
    },

    getSocketMap: _ => socketMap,
    handleData
};
