'use strict';

import mongoose from 'mongoose';

var CinemaSchema = new mongoose.Schema({
  movie: {
    title: String,
    poster: String,
    backdrop: String,
    tagline: String,
    ratings: String,
    // imdb: {
    //   type:String,
    //   unique: true
    // },
    theaters: {
      name: String,
      city: String,
      location: String,
      state: String,
      dates: [String],
      time: [String]
    }

  }
 
});

export default mongoose.model('Cinema', CinemaSchema);
