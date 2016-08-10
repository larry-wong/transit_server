/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-18 14:51
#
# Description:	
#
=============================================================================*/

import { connect } from 'react-redux';
import Account from 'components/main/account';
import { fetchUserInfo } from 'services/account.service';
import { setUser } from 'actions/data';

const mapStateToProps = ({data}) => ({
    user: data.user
});

const mapDispatchToProps = dispatch => ({
    fetchUserInfo: _ => fetchUserInfo(dispatch).then(res => {
        res.ok && dispatch(setUser(res.data[0]));
    })
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
