// frontend/components/header/header.jsx
// @flow

import React from 'react';
import { withRouter } from 'react-router';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import Help from 'material-ui/svg-icons/action/help';
import Search from 'material-ui/svg-icons/action/search';
import RssFeed from 'material-ui/svg-icons/communication/rss-feed';
import RaisedButton from 'material-ui/RaisedButton';

import SearchContainer from '../search/search_container';

class Header extends React.Component {
  constructor(props: Object) {
    super(props);

    this.state = {
      toggleText: 'search',
      open: false,
    };

    this.setSearch = this.setSearch.bind(this);
    this.setStream = this.setStream.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state: Object;
  setSearch: Function;
  setStream: Function;

  setSearch() {
    const search = document.querySelector('.search-container');
    $('.stream-button > button').css('background-color', 'white');
    $('.search-button > button').css('background-color', '#5CB0CF');

    this.props.router.push('/');

    $('.header > div').css('background-color', 'rgb(0, 132, 180)');
    $('.footer').css('background-color', 'rgb(0, 132, 180)');
    // $FlowFixMe
    search.style.visibility = 'visible';
    this.setState({ toggleText: 'search' });
  }

  setStream() {
    const search = document.querySelector('.search-container');
    $('.search-button > button').css('background-color', 'white');
    $('.stream-button > button').css('background-color', '#9EA4D1');

    this.props.router.push('/stream');

    $('.header > div').css('background-color', '#424874');
    $('.footer').css('background-color', '#424874');
    // $FlowFixMe
    search.style.visibility = 'hidden';
    this.setState({ toggleText: 'streaming' });
  }

  handleOpen: Function;
  handleClose: Function;
  search: ?Object;

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const logoStyle = {
      fontSize: '55px',
      marginBottom: '9px',
      ariaHidden: 'true',
      color: 'white',
    };

    const helpStyle = {
      color: 'white',
      marginRight: '25px',
      marginTop: '14px',
    };

    /* eslint-disable react/no-children-prop */
    // Material-UI AppBar accepts "children" as prop, linter false positive
    return (
      <div className="header">
        <AppBar
          title="Tweet The Bay"
          titleStyle={{ marginTop: '6px' }}
          iconElementLeft={<FontIcon className="fa fa-twitter-square" style={logoStyle} />}
          iconElementRight={
            <Help style={helpStyle} className="help-button" onTouchTap={() => this.handleOpen()} />
          }
          children={
            <div className="header-children">
              <div className="search-container">
                <SearchContainer />
              </div>
              <div className="header-buttons">
                <RaisedButton
                  className="search-button"
                  label="Search"
                  icon={<Search />}
                  backgroundColor="#5CB0CF"
                  onTouchTap={() => this.setSearch()}
                  style={{
                    width: '117px',
                    bottom: '14px',
                  }}
                />
                <h3 className="or-text">OR</h3>
                <RaisedButton
                  className="stream-button"
                  label="Stream Tweets"
                  icon={<RssFeed />}
                  onTouchTap={() => this.setStream()}
                  style={{
                    width: '175px',
                  }}
                />
              </div>
              <Dialog
                title="Welcome to Tweet The Bay!"
                modal={false}
                open={this.state.open}
                onRequestClose={() => this.handleClose()}
                bodyStyle={{}}
              >
                <div>
                  Switch between <strong>Live Tweet Streaming</strong> and
                  {' '}<strong>Search</strong> functions by
                  {' '}<strong>clicking</strong> using the buttons in the
                  navigation bar:
                  <br /><br />
                </div>
                <RaisedButton
                  label="Stream Tweets"
                  backgroundColor="#9EA4D1"
                  icon={<RssFeed />}
                  style={{
                    width: '175px',
                  }}
                />
                <p>
                  When streaming, the feed will update every 6 seconds with new
                  tweets. These tweets are a 1% sampling of all messages being
                  tweeted in the greater SF Bay Area. Click on any tweet to see
                  details.
                </p>
                <RaisedButton
                  label="Search"
                  icon={<Search />}
                  backgroundColor="#5CB0CF"
                  style={{
                    width: '117px',
                    bottom: '14px',
                  }}
                />
                <p>
                  When searching, enter any search term and press the
                  {' '}<strong>Enter</strong> key to search for that term
                  wherever the map is positioned. Any trending topic can also be
                  selected as a search term.
                  <br /><br />
                  <strong>Note:</strong> the map can be moved to search anywhere
                  in the world!
                </p>
              </Dialog>
            </div>
          }
          style={{
            backgroundColor: '#0084b4',
            paddingLeft: '70px',
          }}
        />
      </div>
    );
  }
}

export default withRouter(Header);
