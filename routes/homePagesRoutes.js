const express = require('express');
const homePagesController = require('../controllers/homePagesController');

const router = express.Router();

// Get home pages (Alias)
router
  .route('/')
  .get(homePagesController.getAllHomePages)
  .post(homePagesController.createHomePage);

router
  .route('/:id')
  .get(homePagesController.getHomePage)
  .patch(homePagesController.updateHomePage)
  .delete(homePagesController.deleteHomePage);

module.exports = router;