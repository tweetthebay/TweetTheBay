import { connect } from 'react-redux';
import Search from './search';
import { fetchTweets } from '../../actions/tweet_actions';

const mapStateToProps = state => ({
  location: state.mapPosition
});
const mapDispatchToProps = dispatch => ({
  searchTweets: (searchInput, location) => dispatch(fetchTweets(searchInput, location))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
