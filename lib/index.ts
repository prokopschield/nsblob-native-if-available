import nsblob from 'nsblob';

export default nsblob;

try {
	module.exports = require('nsblob-native');
} catch {
	module.exports = require('nsblob');
}
