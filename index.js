// class based version cannot be tested without more npm packages for jest

let events = [];
let beforeEach = null;
let beforeAll = null;

const eventList = {
  addEvent: function (event, ...rest) {
    events = [event.bind(null, this.next, ...rest) ,...events];
    //events.push(event);
  },
  getEvents: () => {
    return events;
  },
  run: function () {
    this.next();
  },
  next: function (...rest) {
    const [current] = events.slice(0, 1);
    if (current && typeof current === "function") {
      events = events.slice(1);
      return current(...rest);
    } else {
      console.log("done");
    }
  }
}


module.exports = eventList;