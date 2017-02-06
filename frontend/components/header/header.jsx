import React from 'react';
import ReactDOM from 'react-dom';
import SearchContainer from '../search/search_container';

import AppBar from 'material-ui/AppBar';
import Dialog from 'material-ui/Dialog';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';
import Help from 'material-ui/svg-icons/action/help';
import Paper from 'material-ui/Paper';
import { hashHistory } from 'react-router';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleText: "search",
      open: false
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }


  handleToggle() {
    var search = document.querySelector(".search-container");
    if (this.state.toggleText === "search") {
      $(".header > div").css("background-color", "#424874");
      $(".footer").css("background-color", "#424874");
      search.style.visibility = "hidden";
      this.setState({toggleText: "streaming"});
    } else {
      $(".header > div").css("background-color", "rgb(0, 132, 180)");
      $(".footer").css("background-color", "rgb(0, 132, 180)");
      search.style.visibility = "visible";
      this.setState({toggleText: "search"});

    }
    if (hashHistory.getCurrentLocation().pathname === "/"){
      hashHistory.push("/stream");
    } else {
      hashHistory.push("/");
    }
  }

  handleOpen(){
    this.setState({open: true});
  }

  handleClose(){
    this.setState({open: false});
  }

  render() {

    const logoStyle = {
      fontSize: "55px",
      marginBottom: "9px",
      ariaHidden: "true",
      color: "white"
    };

    const helpStyle = {
      color: "white",
      marginRight: "25px",
      marginTop: "14px"
    };

    const tooltipStyle = {
      height: 100,
      width: 100,
      margin: 20,
      textAlign: 'center',
      display: 'inline-block',
    };

    return(
      <div className="header">
        <AppBar
            title="Tweet The Bay"
            titleStyle={{marginTop: "6px"}}
            iconElementLeft={<FontIcon
                              className="fa fa-twitter-square"
                              onClick={console.log("hi")}
                              style={logoStyle}/>}
            iconElementRight={<Help
                              style={helpStyle}
                              className="help-button"
                              onTouchTap={() => this.handleOpen()}/>}
            children={<div className="header-children">
                        <div className="search-container">
                          <SearchContainer />
                        </div>
                        <h3 className="search-toggle-text">Search
                        </h3>
                        <Toggle
                          className="toggle"
                          onToggle={this.handleToggle}
                          style={{
                            width: "0px",
                            marginTop: "4px",
                          }}
                          thumbStyle={{
                            backgroundColor: "#3F477F"
                          }}
                          trackStyle={{
                            backgroundColor: "#9EA4D1"
                          }}/>
                        <h3 className="stream-toggle-text">
                          Tweet Stream
                        </h3>
                        <Dialog
                          title="Welcome to Tweet The Bay!"
                          modal={false}
                          open={this.state.open}
                          onRequestClose={() => this.handleClose()}
                          autoDetectWindowHeight={true}
                          bodyStyle={{
                            color: "#393A3E"
                          }}>
                          <p>
                            Switch between <strong>Live Tweet Streaming</strong> and <strong>Search</strong> functions by <strong>clicking</strong> on the <strong>toggle switch</strong> in the navigation bar:
                            <br /><br />
                            <Toggle
                              className="toggle"
                              thumbStyle={{
                                backgroundColor: "#3F477F"
                              }}
                              trackStyle={{
                                backgroundColor: "#9EA4D1"
                              }}/>
                          </p>
                          <p>
                            <strong>When streaming:</strong>
                          </p>
                          <p>
                            The feed will update every 5 seconds with new tweets. These tweets are a 1% sampling of all messages being tweeted in the greater SF Bay Area. Click on any tweet to see details.
                          </p>
                          <p>
                            <strong>When searching:</strong>
                          </p>
                          <p>
                            Enter any search term and press the <strong>Enter</strong> key to search for that term wherever the map is positioned. Any trending topic can also be selected as a search term.
                            <br /><br />
                            <strong>Note:</strong> the map can be moved to search anywhere in the world!
                          </p>
                        </Dialog>
                      </div>}

            style={{
              backgroundColor: '#0084b4',
              paddingLeft: "70px"
            }}
          />
      </div>
    );
  }
}

export default Header;
