const express = require('express');
const router = express.Router();
const { v4: uuidV4 } = require('uuid');

// @desc home route
// @route GET /
router.get('/', (req, res) => {
  res.render('index', {
    url: `${req.protocol}://${req.get('host')}/${uuidV4()}`,
  });
});

// @desc get stream from unique room id
// @route GET /:id
router.get('/:id', (req, res) => {
  res.render('receiver', {
    roomId: req.params.id,
  });
});

module.exports = router;
