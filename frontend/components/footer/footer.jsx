// frontend/components/footer/footer.jsx
// @flow

import React from 'react';

function Footer() {
  return (
    <div className="footer">
      <div className="footer-brand">
        <a href="https://github.com/mjaltamirano/SFTweets">
          <i className="fa fa-github-square fa-2x" aria-hidden="true" />
        </a>
        <div className="copyright">
          © 2017 Tweet the Bay. All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Footer;
