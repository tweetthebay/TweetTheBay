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
      trends: [],
      tweets: [],
      searchTerm: ""
    };

    this.setState = this.setState.bind(this);
    this.sidebarSearch = this.sidebarSearch.bind(this);
  }

  componentWillMount () {
    this.props.fetchCurrentTrends()
      .then(() => {
          this.setState({
            trends: this.props.currentTrends});
        });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.trends) {
      this.setState({ trends: newProps.currentTrends });
    }

    if (newProps.tweets.tweets) {
      if (newProps.tweets.tweets.length > 0) {
        this.setState({ tweets: newProps.tweets.tweets });
      }
    }

    if (newProps.stream.tweets) {
      if (newProps.stream.tweets.length > 0) {
        this.setState({ tweets: newProps.stream.tweets });
      }
    }

    if (newProps.searchTerm) {
      this.setState({ searchTerm: newProps.searchTerm });
    }
  }

  sidebarSearch(searchInput, location) {
    this.props.searchTweets(searchInput, location);
    this.props.setSearchQuery(searchInput);
  }

  render () {

    const trendList = this.state.trends.slice(0,7).map((trend, idx) => {
      const id = trend.id;
      if (trend.volume !== "null") {
        return (
          <div key={ trend.name }>
            <ListItem
              onClick={() => this.sidebarSearch(`${trend.name}`, this.props.location)}
              primaryText={`${trend.name}`}
              secondaryText={
                <p>
                  {trend.volume} people are tweeting about this
                </p>
              }
              secondaryTextLines={ 1 }
              />
            <Divider inset={true} />
          </div>
        );
      }
    });

    const tweetList = this.state.tweets.map((tweet, idx) => {
        const id = tweet.id;

        return (
          <div key={ tweet.text }>
            <ListItem
              onClick={() => this.props.setCurrentTweet({id})}
              leftAvatar= {<img src={`${tweet.profile_picture}`} />}
              primaryText={`${tweet.screen_name}`}
              secondaryText={
                <p>
                  {tweet.text}
                </p>
              }
              secondaryTextLines={ 2 }
              />
            <Divider inset={true} />
          </div>
        );
    });

    return (
      <div className='sidebar-container'>
        <aside className='sidebar'>
          <List>
            { this.state.tweets.length === 0 ? (
              <div>
                <a onClick={() => this.setState({ tweets: [] })} />
                <ListItem
                  primaryText= "Unsure of what to search?"
                  secondaryText= "Try one of these trending topics:"
                  disabled = { true }
                  />
                { trendList }
              </div>
            ) : (
              <div>
                <ListItem
                  primaryText = {`Current Search: "${this.state.searchTerm}"`}
                  disabled = { true }
                  />
                <Divider />
                <Subheader>Most Recent</Subheader>
                { tweetList }
              </div>
            )}
          </List>
          { this.state.tweets.length === 0 ? (
            <div className='search-disclaimer'>
              <p className='search-disclaimer-text'>
                <strong>disclaimer:</strong> only ~3% of tweets have geolocation data, so results may be sparse
              </p>
            </div>
          ) : ""}
        </aside>
      </div>
    );
  }
}

export default searchSidebar;
