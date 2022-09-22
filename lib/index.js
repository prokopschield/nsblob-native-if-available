"use strict";

try {
    module.exports = require('nsblob-native');
}
catch (_a) {
    module.exports = require('nsblob');
}
