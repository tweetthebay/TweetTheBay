// frontend/components/stream/stream_container.js

import { connect } from 'react-redux';
import { fetchStreamSince, clearStream } from '../../actions/stream_actions';
import Stream from './stream';

const mapStateToProps = ({ stream }) => ({
  stream,
});

const mapDispatchToProps = dispatch => ({
  fetchStreamSince: timeNowUTC => dispatch(fetchStreamSince(timeNowUTC)),
  clearStream: () => dispatch(clearStream()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Stream);
