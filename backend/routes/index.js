var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.json({message: 'Im healthy. Serving API for Golf Tee Time scheduling booking.'});
});

module.exports = router;