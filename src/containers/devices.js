/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-19 14:53
#
# Description:	
#
=============================================================================*/

import { connect } from 'react-redux';
import Devices from 'components/main/devices';
import { fetchDevices } from 'services/device.service';
import { hideDialog, showDialog, showSnack
    , setMessageTargetDeviceId } from 'actions/ui';
import { setDevices, updateDevice, removeDevice } from 'actions/data';
import { editDevice, deleteDevice } from 'services/device.service';

const mapStateToProps = ({ui, data}) => ({
    dialogData: ui.dialogData,
    devices: data.devices
});

const mapDispatchToProps = dispatch => ({
    hideDialog: _ => dispatch(hideDialog()),
    showDialog: dialogData => dispatch(showDialog(dialogData)),
    fetchDevices: _ => fetchDevices(dispatch).then(res => {
        res.ok && dispatch(setDevices(res.data));
    }),
    renameAction: (id, name, newName) => {
        if (!newName) {
            dispatch(showDialog({errorText: 'Empty'}));
            return;
        }
        if (newName != name) {
            editDevice({
                id: id,
                name: newName
            }, dispatch).then(res => res.ok && dispatch(updateDevice(res.data))
                && dispatch(showSnack('Rename success!'))
            );
        }
        dispatch(hideDialog());
    },
    setTargetDeviceId: targetDeviceId => dispatch(
        setMessageTargetDeviceId(targetDeviceId)
    ),
    deleteAction: id => {
        deleteDevice(id, dispatch).then(res => res.ok
            && dispatch(removeDevice(id))
            && dispatch(showSnack('Delete success!'))
        );
        dispatch(hideDialog());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
