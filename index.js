// class eventList {
//   constructor(){
//     this.list = [];
//     this.beforeA = (next) => {next()};
//     this.beforeE = () => {};
//   }
//   run = () => {
//     // start the list
//     this.list = [this.beforeA, ...this.list];

//     this.next();
//   };

//   addEvent = (f, ...rest) =>{
//       this.list = [f.bind(null, this.next, ...rest) ,...this.list];
//   };
//   // ?? maybe add middleware style items?
//   addMiddleEvent = f =>{

//   };

//   // beforeAll takes a function that runs before the stack runs 
//   beforeAll = (f) => {
//     this.beforeA =  f.bind(null, this.next);
//   }
//   // before Each takes in a function and the returns it to the params of 
//   // the current item
//   beforeEach = (f) => {
//     this.beforeE =  f;
//   }

//   next = (...rest) => {
//     const [current] = this.list.slice(0, 1);
//     if (current && typeof current === "function") {
//       this.list = this.list.slice(1);
//       return current(this.beforeE(...rest));
//     } else {
//       console.log("done");
//     }
//   };
// };

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