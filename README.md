# Host.ly - Event Registry Management Software

Host.ly is a social platform for communication between hosts/attendees to ensure minimal inventory duplication, whether it be for a wedding or something as informal as a beach weekend.

## Problem Statement
In a city of constantly evolving plans and social fluctuations like New York it can be difficult to cut through difficult scheduling to actually organize and assemble everything needed for a particular event. Everyone is on a budget. This app potluck-izes any endeavor you choose to organize or participate in with your friends.


## Technology Stack

Front End:
- React

Back End:
- Apollo / GraphQL
- Express
- MySQL

## Business Decisions


## Technical Decisions
We chose to go with GraphQL for it's flexibility of its query/mutation structure. It allowed us to easily traverse through users, their invitees, events, items and associated information and considerably decrease the load imposed on the our relational database.
E.G "find the names and claimed items of all of the people going to the event that Jane is holding"


