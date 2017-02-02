import { connect } from 'react-redux';
import searchSidebar from './search_sidebar';
import { setCurrentTweet } from '../../actions/current_tweet_actions';
import { fetchTweets } from '../../actions/tweet_actions';

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  location: state.mapPosition
});

const mapDispatchToProps = dispatch => ({
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet)),
  searchTweets: (searchInput, location) => dispatch(fetchTweets(searchInput, location))
});

export default connect(mapStateToProps, mapDispatchToProps)(searchSidebar);
