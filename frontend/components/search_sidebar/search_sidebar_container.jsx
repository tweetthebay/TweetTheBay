import { connect } from 'react-redux';
import searchSidebar from './search_sidebar';
import { setCurrentTweet } from '../../actions/current_tweet_actions';

const mapStateToProps = state => ({
  tweets: state.tweets.tweets
});

const mapDispatchToProps = dispatch => ({
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet))
});

export default connect(mapStateToProps, mapDispatchToProps)(searchSidebar);
