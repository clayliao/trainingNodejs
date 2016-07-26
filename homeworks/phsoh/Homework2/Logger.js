/**
* A simple but handful logger .
*
* @module Logger
* @class Logger
*/
var Logger = {
    namespace: 'Logger',
    _level: "INFO",
    _levelString: {
        'INFO': 4,
        'WARN': 3,
        'DEBUG': 2,
        'ERROR': 1
    },

    /**
    * Get warning level. Avaiable warning level are 
    * @method level
    */
    'level': function () {
        this.log("The current warning is '" + this._level + "'", "INFO", this.namespace);
    },

    /**
    * Set warning level. Return false if the level is not support.
    * @method setLevel
    * @param {string} level The warning level to set.
    * @return {boolean} False if the level is not support.
    */
    'setLevel': function (level) {
        if (this._levelString[level] !== undefined) {
            this._level = level;
            this.log("Set warning level to '" + level + "'", "INFO", this.namespace);
            return true;
        }
        return false;
    },

    /**
    * Print message with warning level.
    * @method log
    * @param {string} msg       Message to print.
    * @param {string} level     Warning level.
    * @param {string} namespace Namespace that print the message..
    */
    'log': function (msg, level, namespace) {
        if (this._levelString[level] !== undefined
                && this._levelString[level] <= this._levelString[this._level]) {
            var levelColor  = '\u001b[1;' + (this._levelString[level] + 30) + 'm',
                purple      = '\u001b[1;35m',
                resetColor  = '\u001b[0m';

            console.log(
                levelColor + "[" + level + "]" + resetColor
                    + purple + "[" + namespace + "]" + resetColor + " " + msg
            );
        }
    }
};

module.exports = Logger;
