import React, { Component } from 'react';
import Movieitem from './movieitem.js';
import Detail from './Detail.js';

export default class Popular extends Component {
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

  render() {
    const { results } = this.state;

    return (
      <div className='container my-3'>
        <div className="row my-4">
          {results.slice(0, this.props.resultsPerPage).map((element) => (
            <div className='col-md-3' key={element.id}>
              <Movieitem
                title={element.title ? element.title.slice(0, 45) : element.name}
                description={element.overview ? element.overview.slice(0, 80) : ""}
                imgurl={element.poster_path}
                rating={element.vote_average}
                id={element.id}
                onSelectId={this.handleSelectedId}
              />
            </div>
          ))}
        </div>
        <div className="container ">
          <button disabled={this.props.page <= 1} type="button" className="btn btn-dark" onClick={this.props.onPrev}>&larr; previous</button>
          <p style={{ color: '#0ba3d6' }}>Page {this.props.page}</p>
          <button type="button" className="btn btn-dark" onClick={this.props.onNext}>next &rarr;</button>
        </div>
        {this.state.selectedId && <Detail id={this.state.selectedId} />}
      </div>
    );
  }
}
