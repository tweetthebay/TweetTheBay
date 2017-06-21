// frontend/components/stream/stream.jsx
// @flow

import React from 'react';

class Stream extends React.Component {
  constructor(props: Object) {
    super(props);

    this.startStreaming = this.startStreaming.bind(this);
    this.stopStreaming = this.stopStreaming.bind(this);
  }

  componentDidMount() {
    const timeNowUTC = Date.now() - 25000;
    this.props.fetchStreamSince(timeNowUTC);
    this.startStreaming(timeNowUTC);
  }

  componentWillUnmount() {
    this.props.clearStream();
    this.stopStreaming();
  }

  startStreaming: Function;
  stopStreaming: Function;
  timer: number;

  startStreaming(timeNowUTC: string) {
    this.props.fetchStreamSince(timeNowUTC);
    this.timer = setInterval(() => this.props.fetchStreamSince(timeNowUTC), 6000);
  }

  stopStreaming() {
    clearInterval(this.timer);
  }

  render() {
    return <div className="stream-div" />;
  }
}

export default Stream;
