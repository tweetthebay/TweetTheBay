import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Modal from 'react-modal';

class Stream extends React.Component {
  constructor(props) {
    super(props);

    this.startStreaming = this.startStreaming.bind(this);
    this.stopStreaming = this.stopStreaming.bind(this);
  }

  componentDidMount() {
    this.props.clearTweets();
    this.props.fetchStream();
    let that = this;
    setTimeout(function() {
      that.startStreaming();
    }, 1000);
  }

  startStreaming() {
    let that = this;
    let lastTweetId;
    this.timer = setInterval(function(){
      that.props.fetchStream();
    }, 5000);
  }

  stopStreaming() {
    clearInterval(this.timer);
  }

  componentWillUnmount() {
    this.props.clearStream();
    this.stopStreaming();
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Stream;
