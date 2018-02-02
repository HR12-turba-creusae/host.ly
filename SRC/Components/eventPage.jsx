import React from 'react'
import ItemList from './itemList.jsx'
import { withRouter } from 'react-router'

class EventPage extends React.Component {
  render() {
    if (this.props.location.state.event === undefined) {
      console.log('testing', this.props)
      return null
    } else {
      const event = this.props.location.state.event
      console.log('event',this.props.location.state.event)
      return (
        <div style={{"textAlign": "center"}} className="eventPage">
          <h1 className="eventPage">{event.name}</h1>
          <div className="eventPage">{event.location}</div>
          <div className="eventPage">{event.date}</div>
          <div className="eventPage" >{event.description}</div>
          <div>
            <h3>Who's Coming</h3>
            <ul>

            </ul>
          </div>
          <div>
            <h3>Item Registery</h3>
            <ItemList currentUser={this.props.currentUser} event={this.props.location.state.event}></ItemList>
            <ul></ul>
          </div>
          <img
            style={{"height":"400px", "width": "200px"}}
            src={event.img}
            alt=""
          />
        </div>
      )
    }
  }
}


export default withRouter(EventPage)
