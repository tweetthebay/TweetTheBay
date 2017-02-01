import React from 'react';
import ReactDOM from 'react-dom';
import SearchContainer from '../search/search_container';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    return(
      <div className="header">
        <div className="header-container">
          <div className="header-brand">
            <i className="fa fa-twitter-square fa-3x" aria-hidden="true"></i>
            <h1 className="logo">SFTweets</h1>
          </div>
          <p className="website-description">
            A Cool Website
          <br></br>
            For Cool People
          </p>
          <div className="search-container">
            <SearchContainer/>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
