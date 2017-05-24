import { connect } from 'react-redux';
import { fetchStream,
         fetchStreamSince,
         clearStream } from '../../actions/stream_actions';
import Stream from './stream';

const mapStateToProps = ({ stream }) => ({
  stream
});

const mapDispatchToProps = dispatch => ({
  fetchStream: () => dispatch(fetchStream()),
  fetchStreamSince: (timeNowUTC) =>
    dispatch(fetchStreamSince(timeNowUTC)),
  clearStream: () => dispatch(clearStream())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);
