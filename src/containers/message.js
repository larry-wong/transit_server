/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-29 17:12
#
# Description:	
#
=============================================================================*/

import { connect } from 'react-redux';
import Message from 'components/main/message';
import { fetchDevices } from 'services/device.service';
import { sendMessage } from 'services/message.service';
import { setMessageKeyboardOpen, setMessageTargetDeviceId
   , messageType, messageDelete, showSnack } from 'actions/ui';
import { setDevices } from 'actions/data';

const mapStateToProps = ({ui, data}) => ({
    isKeyboardOpen: ui.message.isKeyboardOpen,
    targetDeviceId: ui.message.targetDeviceId,
    messageContent: ui.message.content,
    devices: data.devices
});

const mapDispatchToProps = dispatch => ({
    fetchDevices: _ => fetchDevices(dispatch).then(res => {
        res.ok && dispatch(setDevices(res.data));
    }),
    setKeyboardOpen: isKeyboardOpen => dispatch(
        setMessageKeyboardOpen(isKeyboardOpen)
    ),
    setTargetDeviceId: targetDeviceId => dispatch(
        setMessageTargetDeviceId(targetDeviceId)
    ),
    messageType: value => dispatch(messageType(value)),
    messageDelete: _ => dispatch(messageDelete()),
    messageSend: (targetDeviceId, messageContent) => {
        const messageLength = Math.ceil(messageContent.length / 2);
        const array = new Uint8Array(messageLength + 2);
        array[0] = 2 << 5 | targetDeviceId;
        array[1] = messageLength;
        for (let i = 0; i < messageLength; i++) {
            array[i + 2] = messageContent[i * 2] << 4
                | messageContent[i * 2 + 1]
        }
        sendMessage(array).then(res => {
            if (res.ok) {
                dispatch(showSnack('Message sent.'));
            }
        });
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
