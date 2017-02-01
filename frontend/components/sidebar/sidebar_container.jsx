import { connect } from 'react-redux';
import Sidebar from './sidebar';

const mapStateToProps = state => ({
  tweets: state.tweets.tweets,
  tweet: state.tweets.tweet
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
