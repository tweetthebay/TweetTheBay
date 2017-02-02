import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: ''
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(e) {
    this.setState({ ['searchParams']: e.target.value });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.setCurrentTweet(null);
    this.props.searchTweets(this.state.searchParams, this.props.location);
  }

  render() {
    return(
      <div>
        <form className='search-form' onSubmit={this.handleSubmit}>
          <input
            className='search-input'
            type='text'
            placeholder='Search Tweets'
            onChange={this.update}/>
        </form>
      </div>

    );
  }
}
export default Search;
