import {connect} from 'react-redux';
import Map from './map';
import fetchTweets from '../../actions/tweet_actions';
import { setMapPosition } from '../../actions/map_actions';

const mapStateToProps = state => ({
  tweets: state.tweets
});

const mapDispatchToProps = dispatch => ({
  fetchTweets: () => dispatch(fetchTweets()),
  setMapPosition: pos => dispatch(setMapPosition(pos))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
