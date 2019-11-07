let events = [];

const eventList = {
  // add event to the list of events to be parsed binds the next event to the item
  addEvent: function(event) {
    if(typeof event == "function"){
      events = [event.bind(null, this.next), ...events];
    }
    else if(Array.isArray(event)){
      let bindedArr = event.map(e => {
        if(typeof e !== 'function'){
          throw new Error("EventList does not accept " + typeof event);
        }else{
          return e = e.bind(null, this.next);
        }
      })
      events = [...bindedArr, ...events];
    }
    else{
      throw new Error("EventList does not accept " + typeof event);
    }
  },
  // return list of events for length purposes?
  getEvents: () => {
    // return new array so it cannot be modified by reference
    return [...events];
  },
  // run the event list should be run at the end of a game loop
  run: function() {
    return new Promise((resolve)=>{
      // push a resolve event to the end of the event list so that 
      events.push(resolve);
      return this.next();
    });
  },
  // next moves calls the next event in the list
  next: function() {
    const [current] = events.slice(0, 1);
    if (current && typeof current === "function") {
      events = events.slice(1);
      return current("done");
    } else {
      throw new Error("list item requires a function");
    }
  }
};

module.exports = eventList;
