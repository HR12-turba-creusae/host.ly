const graphql = require('graphql')
const db = require('../ControllersDB/mainController.js')

const {
  GraphQLInt,
  GraphQLString,
  GraphQLObjectType,
  GraphQLID, 
  GraphQLList, 
  GraphQLNonNull
} = graphql
      

const EventType = new GraphQLObjectType({
  name: 'Event',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    date: { type: GraphQLString },
    location: { type: GraphQLString },
    host_id: { type: GraphQLInt },
    user_id: {type: GraphQLInt},
    host: {
      type : UserType,
      resolve(parentValue, args){
        return db.user.getUser(parentValue.host_id)
      }
    },
    reply: { type: GraphQLInt },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return db.event_attendee.getUsers(parentValue.id)
      }
    }, 
    items: {
      type: new GraphQLList(ItemType), 
      resolve(parentValue, args){
        return db.item.getItemsByEventId(parentValue.id)
      }
    }
  })
})

const ItemType = new GraphQLObjectType({
 name: 'Item',
 fields: () => ({
   id: { type: GraphQLInt },
   name: { type: GraphQLString },
   user_id: { type: GraphQLInt },
   event_id: { type: GraphQLInt },
   user: {
     type: UserType,
     resolve(parentValue, args){
       return db.user.getUser(parentValue.user_id)
     }
   },
   event: {
     type: EventType,
     resolve(parentValue, args) {
       return db.event.getEvent(parentValue.event_id)
     }
   }
 })
})

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    img: { type: GraphQLString },
    google_id: { type: GraphQLString },
    etag: { type: GraphQLString },
    member_status: { type: GraphQLInt },
    reply: {type: GraphQLInt},
    hostedEvents: {
      type: new GraphQLList(EventType), 
      resolve(parentValue, args){
        return db.event.getHostedEvents(parentValue.id)
      }
    }, 
    pastEvents: {
      type: new GraphQLList(EventType), 
      resolve(parentValue, args){
        return db.event.getPastEvents(parentValue.id)
      }
    }, 
    currentEvents: {
      type: new GraphQLList(EventType), 
      resolve(parentValue, args){
        return db.event.getCurrentEvents(parentValue.id)
      }
    }
  })
})




module.exports = {EventType, UserType, ItemType}