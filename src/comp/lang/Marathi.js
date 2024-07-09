import React, { Component } from 'react';
import Popular from '../movie/Popular.js';

export default class Marathi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      totalPages: 1, // Initialize totalPages with 1
    };
  }

  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  handleNext = () => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage + 1 }));
  };

  handlePrev = () => {
    this.setState((prevState) => ({ currentPage: prevState.currentPage - 1 }));
  };

  setTotalPages = (totalPages) => {
    this.setState({ totalPages });
  };

  render() {
    return (
      <div>
        <Popular
          url="https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=primary_release_date.desc&vote_count.gte=10&with_original_language=mr&api_key=972bf2f0b5a2dba4a5df2e4153bd68ec"
          resultsPerPage={20} // Change to your desired number
          page={this.state.currentPage}
          totalPages={this.state.totalPages} // Pass totalPages as a prop
          onNext={this.handleNext}
          onPrev={this.handlePrev}
          onPageChange={this.handlePageChange}
          setTotalPages={this.setTotalPages} // Pass the function to set totalPages
        />
      </div>
    );
  }
}
