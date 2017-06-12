// frontend/components/sidebar/sidebar.jsx
// @flow
/* eslint-disable no-nested-ternary */

import React from 'react';
import { withRouter } from 'react-router';

import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

class searchSidebar extends React.Component {
  constructor(props: Object) {
    super(props);

    this.state = {
      trends: [],
      tweets: [],
      searchTerm: '',
    };

    this.sidebarSearch = this.sidebarSearch.bind(this);
    this.handleTweetText = this.handleTweetText.bind(this);
    this.backToTrendingTopics = this.backToTrendingTopics.bind(this);
    this.handleClearSearch = this.handleClearSearch.bind(this);
  }

  state: Object;

  componentWillMount() {
    this.props.fetchCurrentTrends().then(() => {
      this.setState({
        trends: this.props.currentTrends,
      });
    });

    $(document).ajaxStart(() => {
      $('.spinner').show();
      $('.sidebar').hide();
    });

    $(document).ajaxComplete(() => {
      $('.spinner').hide();
      $('.sidebar').show();
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.trends) {
      this.setState({ trends: newProps.currentTrends });
    }

    if (newProps.tweets.tweets) {
      this.setState({ tweets: newProps.tweets.tweets });
    } else {
      this.setState({ tweets: [] });
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

  sidebarSearch: Function;
  handleTweetText: Function;
  backToTrendingTopics: Function;
  handleClearSearch: Function;

  sidebarSearch(searchInput: string, myLocation: Object) {
    this.props.searchTweets(searchInput, myLocation);
    this.props.setSearchQuery(searchInput);
  }

  backToTrendingTopics() {
    this.props.setSearchQuery(null);
  }

  // eslint-disable-next-line class-methods-use-this
  handleTweetText(text: string) {
    if (text.indexOf('&amp;') !== -1) {
      const ampersand = /&amp;/g;
      return text.replace(ampersand, () => '&');
    }

    if (text.indexOf('&gt;') !== -1) {
      const rightCaret = /&gt;/g;
      return text.replace(rightCaret, () => '>');
    }

    if (text.indexOf('&lt;') !== -1) {
      const leftCaret = /&lt;/g;
      return text.replace(leftCaret, () => '<');
    }

    return text;
  }

  handleClearSearch() {
    this.setState({
      trends: this.props.currentTrends,
      tweets: [],
      searchTerm: '',
    });

    this.props.setSearchQuery(null);

    this.props.clearTweets();
  }

  render() {
    // eslint-disable-next-line
    const trendList = this.state.trends.slice(0, 7).map((trend) => {
      if (trend.volume !== 'null') {
        return (
          <div key={trend.name}>
            <ListItem
              onClick={() => this.sidebarSearch(`${trend.name}`, this.props.myLocation)}
              primaryText={`${trend.name}`}
              secondaryText={
                <p>
                  {trend.volume} people are tweeting about this
                </p>
              }
              secondaryTextLines={1}
            />
            <Divider inset />
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
      tweetList = this.state.tweets.map((tweet) => {
        const id = tweet.id;

        const tweetText = this.handleTweetText(tweet.text);

        return (
          <div key={tweet.text}>
            <ListItem
              onClick={() => this.props.setCurrentTweet({ id })}
              leftAvatar={<img alt="Tweet User Avatar" src={`${tweet.profile_picture}`} />}
              primaryText={`${tweet.screen_name}`}
              secondaryText={
                <p>
                  {tweetText}
                </p>
              }
              secondaryTextLines={2}
            />
            <Divider inset />
          </div>
        );
      });
    } else {
      tweetList = '';
    }

    let primaryTextVar;
    let clearTweetsButton;
    if (this.props.routes.length > 1) {
      primaryTextVar = 'You are currently livestreaming!';
    } else {
      primaryTextVar = `Current Search: ${this.props.searchTerm}`;
      clearTweetsButton = (
        <button className="clear-tweets-button" onClick={this.handleClearSearch}>
          Clear Tweets
        </button>
      );
    }

    return (
      <div className="sidebar-container">
        <div id="spinner" className="spinner">
          <img id="img-spinner" src={window.assets.loader} alt="Loading" />
        </div>
        <aside className="sidebar">
          <List>
            {tweetsPresent === false && this.props.searchTerm === null
              ? <div>
                <ListItem
                  primaryText="Unsure of what to search?"
                  secondaryText="Try one of these trending topics:"
                  disabled
                />
                {trendList}
              </div>
              : <div>
                <ListItem primaryText={primaryTextVar} disabled />
                <Divider />
                <Subheader className="tweets-subheader">
                    Most Recent
                    {clearTweetsButton}
                </Subheader>
                {tweetList}
              </div>}
          </List>
          {this.props.searchTerm === null
            ? <div className="search-disclaimer">
              <p className="search-disclaimer-text">
                <strong>Disclaimer:</strong> only ~3% of tweets have
                  geolocation data, so results may be sparse
                </p>
            </div>
            : tweetsPresent === false
              ? <div className="no-tweets-container">
                <p className="no-tweets-found-message">
                    Sorry, we couldn&apos;t geolocate any tweets matching that search
                    term. Please try another search.
                  </p>
                <button className="return-trending-button" onClick={this.backToTrendingTopics}>
                    Go Back to Trending Topics
                  </button>
              </div>
              : ''}
        </aside>
      </div>
    );
  }
}

export default withRouter(searchSidebar);
