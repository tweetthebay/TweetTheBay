import { connect } from 'react-redux';
import Sidebar from './sidebar';
import { setCurrentTweet } from '../../actions/current_tweet_actions';

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  tweet: state.tweets.tweet
});

const mapDispatchToProps = dispatch => ({
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
