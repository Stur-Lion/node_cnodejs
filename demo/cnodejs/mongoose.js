var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cnodejsData',{ useMongoClient: true });

module.exports = mongoose