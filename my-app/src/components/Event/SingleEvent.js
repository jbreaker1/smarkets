import React from "react";


export default class SingleEvent extends React.Component {
  constructor(props) {
      super(props);
    }
    render() {
      const {postinfo} = this.props
      if(postinfo.description === null){
        return (
          <div id = "text">
            <ul>
              <li>Event Name: {postinfo.name}</li>
              <li>Description: no description given</li>
              <li>Event Type: {postinfo.event_type}</li>
              <li>Start Time: {postinfo.start_datetime}</li>
            </ul>
          </div>
        )
      } else {
        return (
          <div id = "text">
            <ul>
              <li>Event Name: {postinfo.name}</li>
              <li>Description: {postinfo.description}</li>
              <li>Event Type: {postinfo.event_type}</li>
              <li>Start Time: {postinfo.start_datetime}</li>
            </ul>
          </div>
        )
      }

    }
}
