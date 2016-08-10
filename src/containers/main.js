/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-12 22:07
#
# Description:	
#
=============================================================================*/

import { connect } from 'react-redux';
import Main from 'components/main';
import { hideSnack, showSnack, setDrawerOpen } from 'actions/ui';
import { clearData } from 'actions/data';

const mapStateToProps = ({ui}) => ({
    snackMessage: ui.snackMessage,
    isDrawerOpen: ui.isDrawerOpen,
    isProgressLoading: ui.isProgressLoading
});

const mapDispatchToProps = dispatch => ({
    hideSnack: _ => dispatch(hideSnack()),
    showSnack: snackMessage => dispatch(showSnack(snackMessage)),
    setDrawerOpen: isDrawerOpen => dispatch(setDrawerOpen(isDrawerOpen)),
    clearData: _ => dispatch(clearData())
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
