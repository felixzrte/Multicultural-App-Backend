const express = require('express');
const clubsController = require('../controllers/clubsController');

const router = express.Router();

// Get Club Clubs (Alias)

router
  .route('/')
  .get(clubsController.getAllClubs)
  .post(clubsController.createClub);

router
  .route('/:id')
  .get(clubsController.getClub)
  .patch(clubsController.updateClub)
  .delete(clubsController.deleteClub);

module.exports = router;