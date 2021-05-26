const mongoose = require('mongoose');

const countSchema = mongoose.Schema({
    count: Number
});
module.exports = mongoose.model('Count', countSchema);