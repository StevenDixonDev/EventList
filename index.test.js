const eventList = require('./index');

test('Add events works', ()=> {
  function test(next){
    next();
  }
  eventList.addEvent(test);
  eventList.addEvent(test);
  eventList.addEvent(test);
  eventList.addEvent(test);
  expect(eventList.getEvents().length).toBe(4);
});

test('run should return done when list is done', (done)=> {
  eventList.run().then(data => {
    expect(data).toBe("done");
    done();
  })
});

test('Functions do not lose scope', (done)=> {
  let name = "bob";
  
  eventList.addEvent((next)=>{
    name = "steven";
    next();
  });

  eventList.run().then(() => {
    expect(name).toBe("steven");
    done();
  });
});

test('Adding non functions to event list should through error', ()=> {
 
  try{
    eventList.addEvent("1");
  }catch(err){
    expect(err.message).toBe("EventList does not accept string");
  }
  
  try{
    eventList.addEvent(0);
  }catch(err){
    expect(err.message).toBe("EventList does not accept number");
  }
  
  try{
    eventList.addEvent({});
  }catch(err){
    expect(err.message).toBe("EventList does not accept object");
  }
});