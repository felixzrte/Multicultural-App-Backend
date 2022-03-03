/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
const Announcement = require('../models/announcementModel');
const APIFeatures = require('../utils/APIFeatures');

//CHANGE ALL OF THIS

exports.getAllAnnouncements = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Announcement.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const announcements = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: announcements.length,
      announcements,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};


exports.createAnnouncement = async (req, res) => {
  try {
    const newAnnouncement = await Announcement.create(req.body);

    res.status(201).json({
      status: 'success',
      announcement: newAnnouncement,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};


exports.getAnnouncement = async (req, res) => {
  // eslint-disable-next-line no-console
  try {
    const announcement = await Announcement.findById(req.params.id);
    // Tour.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      announcement,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};


exports.updateAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findByIdAndUpdate(req.params.id, req.body);

    res.status(200).json({
      status: 'success',
      announcement,
    });
  } catch (err) {
    res.status(400).json({
      status: 'NEW SAMPLE TEXT',
      message: err,
    });
  }
};


exports.deleteAnnouncement = async (req, res) => {
  try {
    await Announcement.findByIdAndUpdate(req.params.id, {deletedStatus: true}, {new: true});
    res.status(204).json({
      status: 'error',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};