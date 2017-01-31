import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: ''
    };
    this.update = this.update.bind(this);
  }

  update() {
    return e => {
      this.setState({ ['searchParams']: e.target.value });
      this.props.searchTweets(e.target.value);
    };
  }

  render() {
    return(
      <div>
        <form className='search-form'>
          <input
            className='search-input'
            type='text'
            placeholder='Search'
            onChange={this.update('searchParams')} />
          <i className="fa fa-search search-icon"
            aria-hidden="true"
            onClick={this.update} ></i>
        </form>
      </div>

    );
  }
}
export default Search;
