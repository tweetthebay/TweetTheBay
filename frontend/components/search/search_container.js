import {connect} from 'react-redux';
import Search from './search';
import {fetchTweets} from '../../actions/tweet_actions';
import { setCurrentTweet } from '../../actions/current_tweet_actions';

const mapStateToProps = state => ({
  location: state.mapPosition
});
const mapDispatchToProps = dispatch => ({
  searchTweets: (searchInput, location) => dispatch(fetchTweets(searchInput, location)),
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
