import {connect} from 'react-redux';
import Map from './map';
import fetchTweets from '../../actions/tweet_actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  fetchTweets: () => dispatch(fetchTweets())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
