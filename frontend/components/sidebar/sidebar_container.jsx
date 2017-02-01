import { connect } from 'react-redux';
import Sidebar from './sidebar';

const mapStateToProps = state => ({
  tweets: state.tweets,
  tweet: state.tweets
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
