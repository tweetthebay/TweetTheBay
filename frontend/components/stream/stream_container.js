import { connect } from 'react-redux';
import Stream from './stream';
import { fetchStream,
         fetchStreamSince,
         clearStream } from '../../actions/stream_actions';
import { clearTweets } from '../../actions/tweet_actions';

const mapStateToProps = ({ stream }) => ({
  stream
});

const mapDispatchToProps = dispatch => ({
  fetchStream: () => dispatch(fetchStream()),
  fetchStreamSince: (timeNowUTC) =>
    dispatch(fetchStreamSince(timeNowUTC)),
  clearStream: () => dispatch(clearStream()),
  clearTweets: () => dispatch(clearStream())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);
