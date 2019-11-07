const eventList = require("./index");

test("Add events works increases size of events array", () => {
  function test(next) {
    next();
  }
  eventList.addEvent(test);
  eventList.addEvent(test);
  eventList.addEvent(test);
  eventList.addEvent(test);
  expect(eventList.getEvents().length).toBe(4);
});

test("Can Add Array of events, trigger in order", (done) => {
  let i = "";
  eventList.addEvent([
    next => {
      i += 'h';
      next();
    },
    next => {
      i += 'i';
      next();
    }
  ]);

  eventList.run().then(() => {
    expect(i).toBe("hi");
    done();
  });
});

test("eventList.run should return done when list is done", done => {
  eventList.run().then(data => {
    expect(data).toBe("done");
    done();
  });
});

test("Functions do not lose scope", done => {
  let name = "bob";

  eventList.addEvent(function(next) {
    name = "steven";
    next();
  });

  eventList.run().then(() => {
    expect(name).toBe("steven");
    done();
  });
});

test("Adding non functions to event list should through error", () => {
  try {
    eventList.addEvent("1");
  } catch (err) {
    expect(err.message).toBe("EventList does not accept string");
  }

  try {
    eventList.addEvent(0);
  } catch (err) {
    expect(err.message).toBe("EventList does not accept number");
  }

  try {
    eventList.addEvent({});
  } catch (err) {
    expect(err.message).toBe("EventList does not accept object");
  }
});

test("Can add an event during event running", (done) => {
  let i = "1";

  eventList.addEvent(next => {
    i += "3";
    l = "r"
    eventList.addEvent(next => {
      i += "5";
      // closure still works
      console.log(l);
      next();
    });
    eventList.addEvent(next => {
      i += "4";
      next();
    });
    next();
  });

  eventList.addEvent(next => {
    i += "2";
    next();
  });

  eventList.run().then(() => {
    expect(i).toBe("12345");
    done();
  });
});

