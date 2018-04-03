/**
 * Ticket model events
 */

'use strict';

import {EventEmitter} from 'events';
import Ticket from './ticket.model';
var TicketEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TicketEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Ticket.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TicketEvents.emit(event + ':' + doc._id, doc);
    TicketEvents.emit(event, doc);
  }
}

export default TicketEvents;
