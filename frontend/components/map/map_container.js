import {connect} from 'react-redux';
import Map from './map';
import fetchTweets from '../../actions/tweet_actions';
import { setMapPosition } from '../../actions/map_actions';
import { setCurrentTweet } from '../../actions/current_tweet_actions';

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  currentTweet: state.currentTweet,
  stream: state.stream.tweets
});

const mapDispatchToProps = dispatch => ({
  fetchTweets: () => dispatch(fetchTweets()),
  setMapPosition: pos => dispatch(setMapPosition(pos)),
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
