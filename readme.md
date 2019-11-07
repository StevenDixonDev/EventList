# Eventlist

Eventlist is a manager for and event system built for games or other event based apps.

This is my attempt to code a management system for these items.

## Core Idea

Start with a Linked list style object

give the user the ability to add items to the list 

let complexity evolve into the system in the form of features.

## Ideas

- Implement socket io into the mix? or make it easy for a user to do so

- Need a kill switch incase the user wants to clear the events from the stack because of another event.

- Events can add events to the stack.

- Add await in the mix? to help handle async functions?

## Design Iterations

1. using class to generate an object.
  * Issue: have to create a new object each time and the list will have to passed around
2. Using Closure to generate a function based system.
  * Seems to be working
  * How to determine when the events are cleared?
  * Event List is an oddity, should I make them a list of promises?
