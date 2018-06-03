import React from "react";
import SingleEvent from "./Event/SingleEvent.js";


export default class Layout extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
        posts: [],
        showMe: true,
        // Easy way to get around asychronus calls
        newpost: []
      };
      this.onClick = this.onClick.bind(this);
    }
    // Fetching info of the url
    fetchFirst(url) {
      let that = this;

      if (url) {
        let item = 'https://cors.now.sh/' + url;
        fetch(item).then((response) => {
          return response.json();
        })
        .then((result) => {
          if(result.results !== undefined){
            that.setState({ posts: result.results});

            that.state.posts.map((post) =>
              <Layout key={post.id} value = {post} />
            )
          } else {
            that.setState({ newpost: result.event});
          }

        });
      }
    }

    // onClick handler for when a user clicks on a event
    onClick(item) {
      let that = this;
      if (that.state.showMe === true){
        that.setState({showMe: false});
        this.fetchFirst(item);
      } else {
        that.setState({ showMe : true} );
      }
    }

    componentWillMount() {
        this.fetchFirst("https://fe-api.smarkets.com/v0/events/popular/");
    }

    render() {
        if(this.state.showMe) {
            return (<div id = "text">
                      Popular Events (click on one to show results)
                      <ul>{this.state.posts.map(post =>
                          <div id = 'popEvent'><li onClick={() => this.onClick("https://fe-api.smarkets.com/v0/events/id/" + post.id)} key={post.id}>{post.name}</li> </div>
                        )}
                      </ul>
                    </div>);
        } else {
            return (<div id = "text"><ul>
                <SingleEvent postinfo={this.state.newpost}/>
                <li onClick={this.onClick}> Go back to popular events</li>

              </ul> </div>);
        }
    }
}
