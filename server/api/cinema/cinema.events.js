/**
 * Cinema model events
 */

'use strict';

import {EventEmitter} from 'events';
import Cinema from './cinema.model';
var CinemaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
CinemaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Cinema.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    CinemaEvents.emit(event + ':' + doc._id, doc);
    CinemaEvents.emit(event, doc);
  }
}

export default CinemaEvents;
