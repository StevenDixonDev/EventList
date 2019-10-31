// start project
const QUEUE = "queue";
const STACK = "stack";

function eventList() {
  this.list = [];
  this.style = QUEUE;
  this.run = () => {
    // start the list
    this.next();
  };
  this.addEvent = f => {
    if (this.style === QUEUE) {
      // add to the back
      this.list.push(f);
    } else if (this.style === STACK) {
      // add to the front
      this.list = [f, ...this.list];
    }
  };
  this.next = err => {
    if (err) {
      return err;
    }
    const [current] = this.list.slice(0, 1);
    this.list = this.list.slice(1);
    if (current && typeof current === "function") {
      return current(this.next);
    } else {
      console.log("done");
    }
  };
}

const El = new eventList();

// define a function that takes the next item
function myAwesomeFunction(next) {
  console.log("hi");
  next();
}

const test = next => {
  console.log("hmmm");
  next();
};

function timeOutTest(next) {
  setTimeout(() => {
    console.log("I am timed!");
    next();
  });
}

El.style = STACK;

El.addEvent(myAwesomeFunction);
El.addEvent(timeOutTest);

El.run();

El.addEvent(test);
