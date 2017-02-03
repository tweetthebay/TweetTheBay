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
    this.state = {};

    this.handleToggle = this.handleToggle.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleToggle(){
    var search = document.querySelector(".search-container");
    if(search.style.visibility === "hidden"){
      search.style.visibility = "visible";
    } else {
      search.style.visibility = "hidden";
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
                              style={helpStyle}/>}
            children={<div className="header-children">
                        <div className="search-container">
                          <SearchContainer />
                        </div>
                        <Toggle
                          label="Streaming/Search"
                          labelPosition="right"
                          labelStyle={{ color: "white" }}
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
      </div>
    );
  }
}

export default Header;
