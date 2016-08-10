/*=============================================================================
#
# Copyright (C) 2016 All rights reserved.
#
# Author:	Larry Wang
#
# Created:	2016-06-23 10:54
#
# Description:	This is the entry file.
#
=============================================================================*/

// Before everything starts, we declare a global require function,
// which resolves path according to project root dir.
global.require = path => require(`${__dirname}${path}`);

// Now, we start the app server.
global.require('/app').start();
