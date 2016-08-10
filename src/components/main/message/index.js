/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-29 17:19
#
# Description:	
#
=============================================================================*/

import React from 'react';
import { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import Backspace from 'material-ui/svg-icons/content/backspace';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import './index.scss';

export default class Message extends Component {

    componentWillMount() {
        this.props.devices || this.props.fetchDevices();
    }

    shouldComponentUpdate(nextProps) {
        return  this.props.isKeyboardOpen != nextProps.isKeyboardOpen
            || this.props.targetDeviceId != nextProps.targetDeviceId
            || this.props.messageContent != nextProps.messageContent
            || this.props.devices != nextProps.devices
    }

    render() {
        console.log('render message...');
        let {targetDeviceId, isKeyboardOpen, messageContent, devices
            , setKeyboardOpen, setTargetDeviceId, messageType
            , messageDelete, messageSend} = this.props;
        const targetDevice = devices
            && devices.find(d => d.id == targetDeviceId);

        const keyboardBtns = [];
        for (let i = 0; i < 16; i++) {
            keyboardBtns.push(<li key = {i}>
                <RaisedButton
                    label = {i.toString(16)}
                    fullWidth = {true}
                    onTouchTap = {_ => messageType(i)}
                />
            </li>)
        }
        keyboardBtns.push(
            <li key = {16}>
                <RaisedButton
                    icon = {<Backspace />}
                    fullWidth = {true}
                    onTouchTap = {messageDelete}
                />
            </li>
        );
        keyboardBtns.push(
            <li key = {17}>
                <RaisedButton
                    icon = {<ArrowDropDown />}
                    fullWidth = {true}
                    onTouchTap = {_ => setKeyboardOpen(false)}
                />
            </li>
        );

        return (
            <div className = 'message'>
                <div className = 'container'>
                    <SelectField
                        fullWidth = {true}
                        disabled = {!devices || !devices.length}
                        hintText = {devices && devices.find(d => d.isOnline)
                            && 'Select target device'
                            || 'No online devices'}
                        value = {targetDevice && targetDeviceId || ''}
                        onChange = {(event, index, value) =>
                            setTargetDeviceId(value)}
                    >
                    {devices && devices.length && devices.map((d, i) =>
                        <MenuItem
                            key = {i}
                            value = {d.id}
                            primaryText = {`[${d.id}] ${d.name}${d.isOnline ? '' : ' (Offline)'}`}
                            disabled = {!d.isOnline}
                        ></MenuItem>
                    )}
                    </SelectField>
                    <Paper
                        zDepth = {2}
                        onTouchTap = {_ => setKeyboardOpen(true)}
                    >
                        <ul className = 'content'>
                            {messageContent.map((msg, i) =>
                                <li key = {i}>
                                    {msg.toString(16).toUpperCase()}
                                </li>
                            )}
                            <li>&nbsp;</li>
                        </ul>
                    </Paper>
                    <RaisedButton
                        label = 'Send'
                        className = 'send-btn'
                        secondary = {true}
                        fullWidth = {true}
                        disabled = {!targetDevice || !targetDevice.isOnline}
                        onTouchTap = {_ =>
                            messageSend(targetDeviceId, messageContent)}
                    />
                </div>
                <ul className = {`keyboard ${isKeyboardOpen ? '' : 'hidden'}`}>
                    {keyboardBtns}
                </ul>
            </div>
        );
    }
}
