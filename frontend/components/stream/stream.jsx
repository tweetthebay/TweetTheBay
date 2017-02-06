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
    let timeNowUTC = Date.now() - 10000;
    this.props.fetchStreamSince(timeNowUTC);
    this.startStreaming(timeNowUTC);
  }

  startStreaming(timeNowUTC) {
    let that = this;
    this.props.fetchStreamSince(timeNowUTC);
    this.timer = setInterval(function(){
      that.props.fetchStreamSince(timeNowUTC);
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
