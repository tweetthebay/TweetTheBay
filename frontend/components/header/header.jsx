import React from 'react';
import ReactDOM from 'react-dom';
import SearchContainer from '../search/search_container';

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
    return(
      <div className="header">

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
          <label className="switch">
            <input type="checkbox" onClick={this.handleToggle}/>
            <div className="slider round"></div>
          </label>
        <div id="myModal" className="modal">
	         <div className="modal-content">
	            <span className="close"
                onClick={this.closeModal}>&times;</span>
			          <div>
	    	          <p>Instructions</p>
			          </div>
	          </div>
	      </div>
        <button onClick={this.openModal}
          className="instructions-button">Instructions</button>

      </div>
    );
  }
}

export default Header;
