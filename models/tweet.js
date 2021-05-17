const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    created_at: String,
    full_text: String,
    phoneNo: [String],
});
tweetSchema.index({'$**': 'text'});
module.exports = mongoose.model('Tweet', tweetSchema);