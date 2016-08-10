/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-07-04 15:16
#
# Description:	
#
=============================================================================*/

import { combineReducers } from 'redux';
import ui from './ui';
import data from './data';

export default combineReducers({ui, data});
