/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-13 13:56
#
# Description:	
#
=============================================================================*/

import React from 'react';
import { Component } from 'react';
import {List, ListItem} from 'material-ui/List';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Router from 'material-ui/svg-icons/hardware/router';
import { grey100, grey600 } from 'material-ui/styles/colors';
import './index.scss';

const DIALOG_TYPE_RENAME = Symbol();
const DIALOG_TYPE_DELETE = Symbol();

export default class Devices extends Component {

    static contextTypes = {
        router: React.PropTypes.object
    }

    componentWillMount() {
        this.props.devices || this.props.fetchDevices();
    }

    render() {
        console.log('render devices...');
        let {dialogData, devices, showDialog, hideDialog, renameAction
            , setTargetDeviceId, deleteAction} = this.props;
        return (!devices ? null :
            !devices.length ? <p
                className = 'device-empty'>No devices avaliable!
            </p> :
            <div className = 'device'>
                <List>
                    {devices.map((d, i) =>
                        <ListItem
                            className = {d.isOnline ? '' : 'offline'}
                            key = {i}
                            leftAvatar = {
                                <Router
                                    color = {d.isOnline ? grey100 : grey600}
                                />
                            }
                            primaryText = {<div className = 'name'>
                                {d.name || 'Anonymous'}
                            </div>}
                            secondaryText = {<p className = 'des'>
                                Device ID: {d.id}{d.isOnline ? ''
                                    : ' (Offline)'}
                            </p>}
                            disabled = {!d.isOnline}
                            rightIconButton = {
                                <IconMenu
                                    iconButtonElement = {
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                >
                                    <MenuItem
                                        primaryText = 'Rename'
                                        onTouchTap = {_ => showDialog({
                                            type: DIALOG_TYPE_RENAME,
                                            id: d.id,
                                            name: d.name
                                        })}
                                    />
                                    {d.isOnline ? <MenuItem
                                        primaryText = 'Send'
                                        onTouchTap = {_ => {
                                            setTargetDeviceId(d.id);
                                            this.context.router
                                                .replace('/message');
                                        }}
                                    /> : null}
                                    {d.isOnline ? null : <MenuItem
                                        primaryText = 'Delete'
                                        onTouchTap = {_ => showDialog({
                                            type: DIALOG_TYPE_DELETE,
                                            id: d.id,
                                            name: d.name
                                        })}
                                    />}
                                </IconMenu>
                            }
                        />
                    )}
                </List>
                <Dialog
                    actions = {[
                        <FlatButton
                            label = 'Cancel'
                            primary = {true}
                            onTouchTap = {hideDialog}
                        />,
                        <FlatButton
                            label = 'OK'
                            primary = {true}
                            onTouchTap = {_ => {
                                dialogData.type === DIALOG_TYPE_RENAME ?
                                renameAction(
                                    dialogData.id,
                                    dialogData.name,
                                    this.refs.renameIpt.input.value
                                ) : deleteAction(dialogData.id);
                            }}
                        />
                    ]}
                    modal = {true}
                    open = {dialogData.isShow}
                >
                    {dialogData.type === DIALOG_TYPE_RENAME ? <TextField
                        ref = 'renameIpt'
                        hintText = 'Device name'
                        defaultValue = {dialogData.name}
                        fullWidth = {true}
                        errorText = {dialogData.errorText}
                    /> : <p>Delete {dialogData.name}?</p>}
                </Dialog>
            </div>
        );
    }
}
