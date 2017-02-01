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
    this.props.searchTweets(this.state.searchParams);
  }

  render() {
    return(
      <div>
        <form className='search-form' onSubmit={this.handleSubmit}>
          <input
            className='search-input'
            type='text'
            placeholder='Search'
            onChange={this.update}/>
          <input type='submit' name='Submit'/>
        </form>
      </div>

    );
  }
}
export default Search;