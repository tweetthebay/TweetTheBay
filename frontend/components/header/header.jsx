import React from 'react';
import ReactDOM from 'react-dom';
import SearchContainer from '../search/search_container';

import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import Toggle from 'material-ui/Toggle';
import Help from 'material-ui/svg-icons/action/help';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleText: "search"
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleToggle() {
    var search = document.querySelector(".search-container");
    if (this.state.toggleText === "search") {
      $(".header > div").css("background-color", "#424874");
      search.style.visibility = "hidden";
      this.setState({toggleText: "streaming"});
    } else {
      $(".header > div").css("background-color", "rgb(0, 132, 180)");
      search.style.visibility = "visible";
      this.setState({toggleText: "search"});

    }
  }

  openModal(){
    $(".modal").css("display","block");

    $(window).click( event => {
      if(event.target.className === "modal"){
        $(".modal").css("display","none");
      }
    });
  }

  closeModal(){
    $(".modal").css("display","none");
  }

  render() {

    const helpStyle = {
      color: "white",
      marginRight: "25px",
      marginTop: "14px"
    };

    return(
      <div className="header">
        <AppBar
            title="Tweet The Bay"
            titleStyle={{marginTop: "6px", }}
            iconElementLeft={<FontIcon
                              className="fa fa-twitter-square"
                              style={{
                                fontSize: "55px",
                                marginBottom: "9px",
                                ariaHidden: "true",
                                color: "white"
                              }}/>}
            iconElementRight={<Help
                              style={helpStyle}
                              className="help-button"
                              onClick={() => this.openModal()}/>}
            children={<div className="header-children">
                        <div className="search-container">
                          <SearchContainer />
                        </div>
                        <h3 className="search-toggle-text">
                          Search
                        </h3>
                        <Toggle
                          className="toggle"
                          onToggle={() => this.handleToggle()}
                          style={{
                            width: "0px",
                            marginTop: "4px",
                          }} />
                        <h3 className="stream-toggle-text">
                          Tweet Stream
                        </h3>
                      </div>}
            style={{
              backgroundColor: '#0084b4',
              paddingLeft: "70px"
            }}
          />
          <div id="myModal" className="modal">
  	         <div className="modal-content">
  	            <span className="close"
                  onClick={this.closeModal}>&times;</span>
  			          <div>
  	    	          <p>Instructions</p>
  			          </div>
  	          </div>
  	      </div>

      </div>
    );
  }
}

export default Header;
