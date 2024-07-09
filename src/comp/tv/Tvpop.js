import React, { Component } from 'react';
import Tvitem from './Tvitem.js';
import Tvdetail from './Tvdetail.js';

export default class Tvpop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      selectedId: null,
    };
  }

  async fetchData(url, page) {
    try {
      let response = await fetch(`${url}&page=${page}`);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Invalid content type. Expected JSON.");
      }

      let parseddata = await response.json();
      this.setState({ results: parseddata.results });
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  }

  async componentDidMount() {
    this.fetchData(this.props.url, this.props.page);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.url !== prevProps.url || this.props.page !== prevProps.page) {
      await this.fetchData(this.props.url, this.props.page);
    }

    // Check if the page has changed
    if (prevState.page !== this.props.page) {
      // Scroll to the top
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }

  handleSelectedId = (id) => {
    this.setState({ selectedId: id });
  };

  next = () => {
    if (this.state.page < Math.ceil(this.state.results.length / this.props.resultsPerPage)) {
      let url = `${this.props.url}&page=${this.state.page + 1}`;
      this.fetchData(url);
      this.setState({ page: this.state.page + 1, selectedId: null });
    }
  };

  prev = () => {
    if (this.state.page > 1) {
      let url = `${this.props.url}&page=${this.state.page - 1}`;
      this.fetchData(url);
      this.setState({ page: this.state.page - 1, selectedId: null });
    }
  };

  render() {
    const { results, selectedId } = this.state;

    return (
      <div className='container my-3'>
        <div className="row my-4">
          {results.slice(0, this.props.resultsPerPage).map((element) => (
            <div className='col-md-3' key={element.id}>
              <Tvitem
                title={element.title ? element.title : element.name}
                desc={element.overview ? element.overview.slice(0, 80) : ""}
                imgurl={element.poster_path}
                rating={element.vote_average}
                id={element.id}
                onSelectId={this.handleSelectedId}
              />
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-around">
          <button disabled={this.props.page <= 1} type="button" className="btn btn-dark" onClick={this.props.onPrev}>&larr; previous</button>
          Page {this.props.page}
          <button type="button" className="btn btn-dark" onClick={this.props.onNext}>next &rarr;</button>
        </div>
        {selectedId && <Tvdetail id={selectedId} />}
      </div>
    );
  }
}
