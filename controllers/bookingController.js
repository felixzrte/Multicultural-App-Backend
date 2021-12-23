const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllBookings = catchAsync(async (req, res, next) => {
  const bookings = await Booking.find();

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    bookings,
  });
});

exports.createBooking = catchAsync(async (req, res, next) => {
  const newBooking = await Booking.create(req.body);

  res.status(201).json({
    status: 'success',
    booking: newBooking,
  });
});
