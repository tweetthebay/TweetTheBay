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
    this.startStreaming();
  }

  startStreaming() {
    let that = this;
    console.log("fetch");
    console.log(store.getState());
    this.timer = setInterval(function(){
      that.props.fetchStream();
    }, 5000);
  }

  stopStreaming() {
    console.log("fetch");
    console.log(store.getState());
    clearInterval(this.timer);
  }

  componentWillUnmount() {
    this.stopStreaming();
    this.props.clearStream();
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default Stream;
