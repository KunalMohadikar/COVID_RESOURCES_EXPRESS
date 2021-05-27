const mongoose = require('mongoose');

const lastUpdateSchema = mongoose.Schema({
    date: Date
});
module.exports = mongoose.model('LastUpdate', lastUpdateSchema);