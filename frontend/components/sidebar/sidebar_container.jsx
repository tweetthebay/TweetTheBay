import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { setCurrentTweet } from '../../actions/current_tweet_actions';
import { fetchCurrentTrends } from '../../actions/current_trend_actions';

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  currentTrends: state.currentTrends
});

const mapDispatchToProps = dispatch => ({
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet)),
  fetchCurrentTrends: () => dispatch(fetchCurrentTrends())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
