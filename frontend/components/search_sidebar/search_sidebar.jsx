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

class searchSidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: {
        trends: [],
        tweets: []
      }
    };

    this.setState = this.setState.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tweets) {
      this.setState({ tweets: newProps.tweets });
      console.log(newProps);
    }
  }

  render () {

    let trendPlaceCount = 1;

    const trendList = this.state.tweets.trends.slice(0,5).map((trend, idx) => {
      const id = trend.id;
      if (trend.volume !== "null") {
        trendPlaceCount += 1;
        return (
          <ListItem
            key={ idx }
            onClick={() => this.props.searchTweets(`${trend.name}`, this.props.location)}
            primaryText={`${trend.name}`}
            secondaryText={
              <p>
                {trend.volume} people are tweeting about this
              </p>
            }
            secondaryTextLines={ 1 }
            />
        );
      }
    });

    const tweetList = this.state.tweets.tweets.map((tweet, idx) => {
        const id = tweet.id;

        return (
          <ListItem
            key={ idx }
            onClick={() => this.props.setCurrentTweet({id})}
            leftAvatar= {<img src={`${tweet.user_image}`} />}
            primaryText={`${tweet.user_name}`}
            secondaryText={
              <p>
                {tweet.text}
              </p>
            }
            secondaryTextLines={ 2 }
            />
        );
    });

    return (
      <div className='sidebar-container'>
        <aside className='sidebar'>
          <List>
            { this.state.tweets.tweets.length === 0 ? (
              <div>
                <ListItem
                  primaryText= "Unsure of what to search?"
                  secondaryText= "Try one of these trending topics:"
                  disabled= {true}
                  />
                { trendList }
              </div>
            ) : (
              <div>
                <Subheader>Most Recent</Subheader>
                { tweetList }
              </div>
            )}
          </List>
          { this.state.tweets.tweets.length === 0 ? (
            <div className='search-disclaimer'>
              <p className='search-disclaimer-text'>
                <strong>disclaimer:</strong> Only ~3% of tweets have geolocation data, so results may be sparse
              </p>
            </div>
          ) : ""}
        </aside>
      </div>
    );
  }
}

export default searchSidebar;
