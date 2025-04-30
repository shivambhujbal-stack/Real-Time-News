const mongoose = require('mongoose');
const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('News', NewsSchema);