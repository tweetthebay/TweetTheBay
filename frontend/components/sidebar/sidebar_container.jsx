// frontend/components/sidebar/sidebar_container.jsx

import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { setCurrentTweet } from '../../actions/current_tweet_actions';
import { fetchCurrentTrends } from '../../actions/current_trend_actions';
import { fetchTweets, setSearchQuery, clearTweets } from '../../actions/tweet_actions';

const mapStateToProps = state => ({
  tweets: state.tweets,
  searchTerm: state.searchQuery,
  currentTrends: state.currentTrends.trends,
  myLocation: state.mapPosition,
  stream: state.stream,
});

const mapDispatchToProps = dispatch => ({
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet)),
  fetchCurrentTrends: () => dispatch(fetchCurrentTrends()),
  searchTweets: (searchInput, myLocation) => dispatch(fetchTweets(searchInput, myLocation)),
  setSearchQuery: searchInput => dispatch(setSearchQuery(searchInput)),
  clearTweets: () => dispatch(clearTweets()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
