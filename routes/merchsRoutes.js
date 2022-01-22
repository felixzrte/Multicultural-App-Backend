const express = require('express');
const merchPageController = require('../controllers/merchPageController');

const router = express.Router();

// Get Merch

router
  .route('/')
  .get(merchPageController.getAllMerchs)
  .post(merchPageController.createMerch);

router
  .route('/:id')
  .get(merchPageController.getMerch)
  .patch(merchPageController.updateMerch)
  .delete(merchPageController.deleteMerch);

module.exports = router;