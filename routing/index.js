const router = require('express').Router();
const {
  homeCtrl,
  servicesCtrl,
  contactCtrl,
  postTask
} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.post('/todos/create',postTask);
router.get('/services', servicesCtrl);
router.get('/contact', contactCtrl);

router.get('*', (req, res) => res.redirect('/home'));
module.exports = router;