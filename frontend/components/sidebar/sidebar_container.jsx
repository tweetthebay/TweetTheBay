import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { setCurrentTweet } from '../../actions/current_tweet_actions';
import { fetchCurrentTrends } from '../../actions/current_trend_actions';
import { fetchTweets } from '../../actions/tweet_actions';

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  currentTrends: state.currentTrends,
  location: state.mapPosition
});

const mapDispatchToProps = dispatch => ({
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet)),
  fetchCurrentTrends: () => dispatch(fetchCurrentTrends()),
  searchTweets: (searchInput, location) => dispatch(fetchTweets(searchInput, location))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
