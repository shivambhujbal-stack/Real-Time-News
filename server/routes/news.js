const express = require('express');
const router = express.Router();
const News = require('../models/News');
const { broadcastNews } = require('../index');

router.post('/', async (req, res) => {
  const news = new News(req.body);
  await news.save();
  broadcastNews(news);
  res.status(201).send(news);
});

router.get('/trending', async (req, res) => {
  const trending = await News.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 }
  ]);
  res.send(trending);
});

module.exports = router;