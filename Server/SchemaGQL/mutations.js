const graphql = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLNonNull, GraphQLInt, GraphQLList } = graphql;
const UserType = require('./types').UserType
const EventType = require('./types').EventType;
const ItemType = require('./types').ItemType;
const ItemsType = require('./types').ItemsType;
const db = require('../ControllersDB/mainController.js');


const mutations = new GraphQLObjectType({
  name: 'Mutation',
  fields: {

  deleteUser: {
    type: UserType,
    args: { id: { type: GraphQLInt }
    },
    resolve(parentValue, args) {
      return db.user.deleteUser(args.id)
        .then(item => item)
    }
  },
  addEvent: {
    type: EventType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      host_id: { type: new GraphQLNonNull(GraphQLID) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      date: { type: GraphQLString } ,
      location: { type: new GraphQLNonNull(GraphQLString)},
      img: { type: new GraphQLNonNull(GraphQLString)}
    },
    resolve(parentValue, args) {
      return db.event.addEvent({
        host_id: args.host_id,
        name: args.name,
        description: args.description,
        date: args.date,
        location: args.location,
        img: args.img
      })
    }
  },
  editEventFields: {
    type: EventType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID)},
      name: { type: GraphQLString },
      description: {type: GraphQLString },
      date: { type: GraphQLString },
      location: { type: GraphQLString },
      img: { type: GraphQLString }
    },
    resolve(parentValues, args) {
      return db.event.editEventFields(args.id, args)
        .then(editedEvent =>  editedEvent[0])
    }
    },
    toggleClaimOfItem: {
      type: ItemType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID)},
        user_id: { type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(parentValues, args) {
        return db.item.claimItem(args.id, args.user_id)
          .then(response => response[0])
      }
  },
  findOrCreateUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString)},
      img: { type: new GraphQLNonNull(GraphQLString)},
      google_id: { type: new GraphQLNonNull(GraphQLString)},
      etag: { type: new GraphQLNonNull(GraphQLString)},
      email: { type: GraphQLString},

    },
    resolve(parentValues, args) {
      return db.user.findOrCreateUser(args)
        .then(response => response)
        .catch(error => error)
    }
  },
  confirmPresence: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt)},
      guest_event_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parentValues, args) {
      return db.event_attendee.confirmPresence(args.id, args.guest_event_id)
        .then(user => user)
        .catch(error => error)
    }
  },
  denyPresence: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLInt)},
      guest_event_id: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve(parentValues, args) {
      return db.event_attendee.denyPresence(args.id, args.guest_event_id)
        .then(user => user)
        .catch(error => error)
    }
  },
  addItem: {
    type: ItemType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      user_id: { type: GraphQLID },
      event_id: { type: new GraphQLNonNull(GraphQLID)}
    },
    resolve(parentValues, args) {
      return db.item.add({
        name: args.name,
        user_id: args.user_id,
        event_id: args.event_id
      })
      .then(item => item)
      .catch(error => error)
    }
  },
  addItems: {
    type: new GraphQLList(ItemsType),
    args: {
      itemNames: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
      eventId: { type: new GraphQLNonNull(GraphQLInt)  }
    },
    resolve(parentValues, args) {
      console.log('args in mutations', args)
      return db.item.addMultiple({
        name: args.itemNames,
        event_id: args.event_id
      }).then(() => {
      return db.item.getItemsByEventId(args.event_id)
      })
    }
    // items: {
    //   type: new GraphQLList(ItemType),
    //   resolve(parentValue, args){
    //     return db.item.getItemsByEventId(args.eventId)
    //   }
    }

}
})







module.exports = mutations;


// addEvent
// deleteEvent
// editEvent
// confirmPresence
// denyPresence
