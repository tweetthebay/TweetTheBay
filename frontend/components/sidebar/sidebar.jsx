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
    this.backToTrendingTopics = this.backToTrendingTopics.bind(this);
  }

  componentWillMount () {
    this.props.fetchCurrentTrends()
      .then(() => {
          this.setState({
            trends: this.props.currentTrends});
        });

    $( document ).ajaxStart(function() {
      $(".spinner").show();
      $(".sidebar").hide();
    });

    $( document ).ajaxComplete(function() {
      $(".spinner").hide();
      $(".sidebar").show();
    });
  }

  componentWillReceiveProps(newProps) {

    if (newProps.trends) {
      this.setState({ trends: newProps.currentTrends });
    }

    if (newProps.tweets.tweets) {
        this.setState({ tweets: newProps.tweets.tweets });

      } else {
        this.setState({ tweets: []});
    }

    if (newProps.stream !== this.props.stream) {
      this.setState({ tweets: newProps.stream.tweets });
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

  backToTrendingTopics(){
    this.props.setSearchQuery(null);
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

    let tweetsPresent = false;
    if (this.state.tweets) {
      if (this.state.tweets.length > 0) {
        tweetsPresent = true;
      } else {
        tweetsPresent = false;
      }
    }

    let tweetList;
    if (tweetsPresent) {
      tweetList = this.state.tweets.map((tweet, idx) => {
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
    } else {
      tweetList = "";
    }

    let primaryTextVar;
    if (this.props.stream.tweets) {
      if (this.props.stream.tweets.length > 0) {
        primaryTextVar = `You are currently livestreaming!`;
      }
    } else {
      primaryTextVar = `Current Search: ${this.props.searchTerm}`;
    }

    return (
      <div className='sidebar-container'>
        <div id="spinner" className="spinner">
          <img id="img-spinner" src={window.assets.loader} alt="Loading"/>
        </div>
        <aside className='sidebar'>
          <List>
            { ( tweetsPresent === false && this.props.searchTerm === null) ? (
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
                  primaryText = {primaryTextVar}
                  disabled = { true }
                  />
                <Divider />
                <Subheader>Most Recent</Subheader>
                { tweetList }
              </div>
            )}
          </List>
          { this.props.searchTerm === null ? (
            <div className='search-disclaimer'>
              <p className='search-disclaimer-text'>
                <strong>Disclaimer:</strong> only ~3% of tweets have geolocation data, so results may be sparse
              </p>
            </div>
          ) : (
            tweetsPresent === false ? (
              <div className="no-tweets-container">
                <p className="no-tweets-found-message">Sorry, we couldn't geolocate any tweets matching that search term. Please try another search.</p>
                <button className="return-trending-button"
                  onClick={this.backToTrendingTopics}>Go Back to Trending Topics</button>
              </div>
            ) : (
              ""
            )
          )}
        </aside>
      </div>
    );
  }
}

export default searchSidebar;
