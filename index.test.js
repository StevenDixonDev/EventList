const eventList = require('./index');

test('Add an event works', ()=> {
  function test(next){
    console.log("test");
    next();
  }
  eventList.addEvent(test);
  expect(eventList.getEvents().length).toBe(1);
});

test('run should return undefined', ()=> {
  expect(eventList.run()).toBe(undefined);
});