class eventList {
  constructor(){
    this.list = [];
    this.beforeA = (next) => {next()};
    this.beforeE = () => {};
  }
  run = () => {
    // start the list
    this.list = [this.beforeA, ...this.list];
    
    this.next();
  };

  addEvent = (f, ...rest) =>{
      this.list = [f.bind(null, this.next, ...rest) ,...this.list];
  };
  // ?? maybe add middleware style items?
  addMiddleEvent = f =>{
    
  };

  // beforeAll takes a function that runs before the stack runs 
  beforeAll = (f) => {
    this.beforeA =  f.bind(null, this.next);
  }
  // before Each takes in a function and the returns it to the params of 
  // the current item
  beforeEach = (f) => {
    this.beforeE =  f;
  }

  next = (...rest) => {
    const [current] = this.list.slice(0, 1);
    if (current && typeof current === "function") {
      this.list = this.list.slice(1);
      return current(this.beforeE(...rest));
    } else {
      console.log("done");
    }
  };
}


// works great but user cannot pass values to the function...
const El = new eventList();

// define a function that takes the next item
const test = (next, i) => {
  console.log(i);
  next(i);
};

function timeOutTest(next, i) {
  setTimeout(() => {
    console.log(i);
    next(i);
  });
}

El.beforeAll(
  function(next)
  {
    let i = 0;
    console.log("wow");
    next(i);
  })

El.beforeEach((i)=>{
  return i+1;
})

El.addEvent(test);
El.addEvent(timeOutTest);

El.run();

El.addEvent(test);
