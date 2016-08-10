/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-12 16:16
#
# Description:	
#
=============================================================================*/

import { connect } from 'react-redux';
import App from 'components/app';
import { hideSnack, setDrawerState } from 'actions/ui';

const mapStateToProps = ({ui}) => ({
    isSigned: ui.isSigned,
    snackMessage: ui.snackMessage
});

const mapDispatchToProps = dispatch => ({
    hideSnack: _ => dispatch(hideSnack()),
    setDrawerState: isDrawerOpen => dispatch(setDrawerState(isDrawerOpen))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
