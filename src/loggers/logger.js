import log4js from 'log4js';

log4js.configure({
    appenders:{
        logsConsola: {type: "console"},
        logsFileWarning: {type: "file", filename: "warn.log"},
        logsFileError: {type: "file", filename: "error.log"}
    },
    categories:{
        default: {appenders: ['logsConsola'], level: 'all'},
        console: {appenders: ['logsConsola'], level: 'all'},
        warning: {appenders: ['logsFileWarning'], level: 'warn'},
        error: {appenders: ['logsFileError'], level: 'error'}
    }
})

const logWarning = log4js.getLogger('warning');
const logError = log4js.getLogger('error');
const logInfo = log4js.getLogger();

export {logWarning, logError, logInfo};