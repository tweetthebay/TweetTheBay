// frontend/components/stream/stream.jsx
// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import Modal from 'react-modal';

class Stream extends React.Component {

  startStreaming: Function;
  stopStreaming: Function;
  timer: number;

  constructor(props: Object) {
    super(props);

    this.startStreaming = this.startStreaming.bind(this);
    this.stopStreaming = this.stopStreaming.bind(this);
  }

  componentDidMount() {
    let timeNowUTC = Date.now() - 25000;
    this.props.fetchStreamSince(timeNowUTC);
    this.startStreaming(timeNowUTC);
  }

  startStreaming(timeNowUTC: string) {
    let that = this;
    this.props.fetchStreamSince(timeNowUTC);
    this.timer = setInterval(function(){
      that.props.fetchStreamSince(timeNowUTC);
    }, 6000);
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
      <div className="stream-div"></div>
    );
  }
}

export default Stream;
