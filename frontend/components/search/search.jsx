import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: '',
    };

    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.searchTweets();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.searchTerm) {
      console.log(`${newProps.searchTerm}`);
      $("input:text").val(`${newProps.searchTerm}`);
    }
  }

  update(e) {
    this.setState({ ['searchParams']: e.target.value });
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.setCurrentTweet(null);
    this.props.searchTweets(this.state.searchParams, this.props.location);
    this.props.setSearchQuery(this.state.searchParams);
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
