import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { setCurrentTweet } from '../../actions/current_tweet_actions';
import { fetchCurrentTrends } from '../../actions/current_trend_actions';
import { fetchTweets, setSearchQuery } from '../../actions/tweet_actions';

const mapStateToProps = state => ({
  tweets: state.tweets,
  searchTerm: state.tweets.searchTerm,
  currentTrends: state.currentTrends.trends,
  location: state.mapPosition,
  stream: state.stream
});

const mapDispatchToProps = dispatch => ({
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet)),
  fetchCurrentTrends: () => dispatch(fetchCurrentTrends()),
  searchTweets: (searchInput, location) => dispatch(fetchTweets(searchInput, location)),
  setSearchQuery: searchInput => dispatch(setSearchQuery(searchInput))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
