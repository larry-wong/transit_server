const dataService = require('./data-service');
const tcpServer = require('./tcp-server');
const httpServer = require('./web-server');

module.exports = {

    start: _ => {

        // Init data service first.
        dataService.init().then(_ => {

            // Init tcp server.
            tcpServer.init();

            // Init http server.
            httpServer.init();
        });
    }
};
