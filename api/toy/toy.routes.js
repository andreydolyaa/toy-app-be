
const express = require('express');
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getToys, getToy, addToy, removeToy, updateToy } = require('./toy.controller.js');
const router = express.Router();




router.get('/', getToys);
router.post('/',requireAuth,requireAdmin, addToy);
router.get('/:id', getToy);
router.put('/:id', requireAuth,requireAdmin, updateToy);
router.delete('/:id', requireAuth, requireAdmin, removeToy);
// router.put('/:id', requireAuth, updateToy);


module.exports = router;