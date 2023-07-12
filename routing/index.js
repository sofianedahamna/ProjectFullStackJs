const router = require('express').Router();
const {
  homeCtrl,
  servicesCtrl,
  contactCtrl,
  postTask,
  usersCtrl,
  tasksCtrl,
  update,
  taskCat,
  taskCatByValueAndUser
} = require('../controllers/app.ctrl');

router.get('/home', homeCtrl);
router.get('/user',usersCtrl);
router.get('/cat/:prioriCat/:urgentCat',taskCat);
router.get('/cat01/:cat/:user',taskCatByValueAndUser);
router.get('/services', servicesCtrl);
router.get('/contact', contactCtrl);
router.post('/todos/create',postTask);
router.get('/user/:iduser', tasksCtrl);
router.put('/todos/create/:id/:done',update);

router.get('*', (req, res) => res.redirect('/home'));
module.exports = router;