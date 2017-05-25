import { connect } from 'react-redux';
import Search from './search';
import { fetchTweets, setSearchQuery } from '../../actions/tweet_actions';
import { setCurrentTweet } from '../../actions/current_tweet_actions';

const mapStateToProps = state => ({
  location: state.mapPosition,
  searchTerm: state.searchQuery
});

const mapDispatchToProps = dispatch => ({
  searchTweets: (searchInput, location) => dispatch(fetchTweets(searchInput, location)),
  setCurrentTweet: tweet => dispatch(setCurrentTweet(tweet)),
  setSearchQuery: searchInput => dispatch(setSearchQuery(searchInput))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
