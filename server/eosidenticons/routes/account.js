const express = require('express');
const router = express.Router();
const fs = require('fs');

const EOSidenticon = fs.readFileSync('modules/EOSidenticon.js').toString();

/* GET users listing. */
router.get('/:accountName', function(req, res, next) {
  const accountName = String(req.params.accountName).split(/[^a-zA-Z0-9]/).join('').toLowerCase(); // clean accountName string only lowercase and numbers
  const indeticonJS = String(EOSidenticon).split('window.JSEidenticonsAccountName').join("'"+accountName+"'");
  res.send(indeticonJS);
});

module.exports = router;
