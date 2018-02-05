'use strict';

import mongoose from 'mongoose';

var TheaterSchema = new mongoose.Schema({
  Name: String,
  Location: String,
  City: String
});

export default mongoose.model('Theater', TheaterSchema);
