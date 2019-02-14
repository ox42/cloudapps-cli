var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', asyncWrap(async (req, res) => {

  return res.render('index', {

    //we can send any data down to our partial views
    title: `${config.APP_NAME} Frontpage`
  });

}));

module.exports = router;
