var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:accountName', function(req, res, next) {
  const accountName = String(req.params.accountName).split(/[^a-zA-Z0-9]/).join('').toLowerCase(); // clean accountName string only lowercase and numbers

  res.send(`<script>document.write('Account: ${accountName}');</script>`);
});

module.exports = router;
