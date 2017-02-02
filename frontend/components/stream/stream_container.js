import { connect } from 'react-redux';
import Stream from './stream';
import { fetchStream, clearStream } from '../../actions/stream_actions';

const mapStateToProps = ({ stream }) => ({
  stream
});

const mapDispatchToProps = dispatch => ({
  fetchStream: () => dispatch(fetchStream()),
  clearStream: () => dispatch(clearStream())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stream);
