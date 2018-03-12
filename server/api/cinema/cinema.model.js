'use strict';

import mongoose from 'mongoose';

var CinemaSchema = new mongoose.Schema({
  movie: {
    title: String,
    poster: String,
    backdrop: String,
    // imdb: {
    //   type:String,
    //   unique: true
    // },
    theaters: {
      name: String,
      city: String,
      dates: [String],
      time: [String]
    }

  }
 
});

export default mongoose.model('Cinema', CinemaSchema);
