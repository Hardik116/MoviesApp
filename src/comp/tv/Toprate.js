import React, { Component } from 'react';
import Tvpop from './Tvpop.js';

export default class Toprate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
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

  render() {
    return (
      <div>
        <Tvpop
          url="https://api.themoviedb.org/3/tv/top_rated?api_key=972bf2f0b5a2dba4a5df2e4153bd68ec"
          resultsPerPage={20} // Change to your desired number
          page={this.state.currentPage}
          onNext={this.handleNext}
          onPrev={this.handlePrev}
          onPageChange={this.handlePageChange}
        />
      </div>
    );
  }
}
