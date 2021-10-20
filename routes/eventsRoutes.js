const express = require('express');
const eventsController = require('../controllers/eventsController');

const router = express.Router();

// Get Club Events (Alias)
router
  .route('/lal-events')
  .get(eventsController.aliasLalEvents, eventsController.getAllEvents);
router
  .route('/csa-events')
  .get(eventsController.aliasCsaEvents, eventsController.getAllEvents);

router
  .route('/')
  .get(eventsController.getAllEvents)
  .post(eventsController.createEvent);

router
  .route('/:id')
  .get(eventsController.getEvent)
  .patch(eventsController.updateEvent)
  .delete(eventsController.deleteEvent);

module.exports = router;
