// frontend/components/footer/footer.jsx
// @flow

import React from 'react';
import ReactDOM from 'react-dom';

class Footer extends React.Component {

  state: Object;
  
  constructor(props: Object) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div className="footer">
        <div className="footer-brand">
          <a href="https://github.com/mjaltamirano/SFTweets"><i className="fa fa-github-square fa-2x" aria-hidden="true"></i></a>
          <div className='copyright'>
            © 2017 Tweet the Bay. All rights reserved.
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
