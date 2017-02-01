import React from 'react';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tweets: []
    };

    this.setState = this.setState.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tweets) {
      this.setState({tweets: newProps.tweets});
      console.log(newProps.tweets);
    }
  }

  render () {

    const tweetList = this.state.tweets.map((tweet, idx) => {

      return (
        <li key={idx} className='tweet-list-item'>
          <p>{tweet.text}</p>
          <p> - {tweet.user_name}</p>
        </li>
      );
    });

    return (
      <aside className='sidebar'>
        <ul>
          {tweetList}
        </ul>
      </aside>
    );
  }
}

export default Sidebar;
