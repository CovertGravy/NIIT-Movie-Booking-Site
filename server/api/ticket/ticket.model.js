'use strict';

import mongoose from 'mongoose';

var TicketSchema = new mongoose.Schema({
  movie: String,
  state: String,
  city: String,
  location: String,
  date: String,
  time: String,
  tickets: String,
  seats: [String]
});

export default mongoose.model('Ticket', TicketSchema);
