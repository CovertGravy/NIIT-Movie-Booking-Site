'use strict';

import mongoose from 'mongoose';

var MovieSchema = new mongoose.Schema({
  Title: String,
  Poster: String,
  Genre: String,
  Duration: Number,
  Year: String,
  Overview: String,
  imdb_id:String,
  backdrop: String,
  tagline: String,
  ratings: String

});

export default mongoose.model('Movie', MovieSchema);
