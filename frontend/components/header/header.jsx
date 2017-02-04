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
      toggleText: "Search"
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleToggle() {
    var search = document.querySelector(".search-container");
    if (this.state.toggleText === "Search") {
      $("label").text("Streaming");
      this.setState({toggleText: "Streaming"});
      search.style.visibility = "hidden";
    } else {
      $("label").text("Search");
      this.setState({toggleText: "Search"});
      search.style.visibility = "visible";
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
                        <Toggle
                          className="toggle"
                          label="Search"
                          labelPosition="right"
                          labelStyle={{ color: "white" }}
                          onToggle={() => this.handleToggle()}
                          style={{
                            width: "0px",
                            marginTop: "4px",
                          }} />
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
