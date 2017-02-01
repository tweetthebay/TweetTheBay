import React from 'react';

import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: []
    };

    this.setState = this.setState.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tweets) {
      this.setState({ tweets: newProps.tweets });
      console.log(newProps.tweets);
    }
  }

  render () {

    const tweetList = this.state.tweets.map((tweet, idx) => {

      return (
          <ListItem
            key={ tweet.user_name }
            leftAvatar= {<img src={`${tweet.user_image}`} />}
            primaryText={`${tweet.user_name}`}
            secondaryText={
              <p>
                {tweet.text}
              </p>
            }
            secondaryTextLines={ 3 }
            />
      );
    });

    return (
      <aside className='sidebar'>
        <List>
          <Subheader>Most Recent</Subheader>
          { tweetList }
        </List>
      </aside>
    );
  }
}

export default Sidebar;
