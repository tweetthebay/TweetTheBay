import {connect} from 'react-redux';
import Search from './search';
import {fetchTweets} from '../../actions/tweet_actions';

const mapStateToProps = state => ({

});
const mapDispatchToProps = dispatch => ({
  searchTweets: (searchInput) => dispatch(fetchTweets(searchInput))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
