const router = require('express').Router();
const {
  homeCtrl,
} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);


router.get('*', (req, res) => res.redirect('/home'));
module.exports = router;