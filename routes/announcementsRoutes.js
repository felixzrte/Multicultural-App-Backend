const express = require('express');
const announcementsController = require('../controllers/announcementsController');

const router = express.Router();

router
  .route('/')
  .get(announcementsController.getAllAnnouncements)
  .post(announcementsController.createAnnouncement);

router
  .route('/:id')
  .get(announcementsController.getAnnouncement)
  .patch(announcementsController.updateAnnouncement)
  .delete(announcementsController.deleteAnnouncement);

module.exports = router;