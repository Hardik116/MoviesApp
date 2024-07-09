import React, { Component } from 'react';
import Movieitem from './movieitem.js';
import Detail from './Detail.js';

export default class Similar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      loading: false,
      page: 1,
      selectedId: null,
    };
  }

  async fetchData(url) {
    try {
      let response = await fetch(url);

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
    this.fetchData(this.props.url);
  }

  async componentDidUpdate(prevProps) {
    if (this.props.url !== prevProps.url) {
      await this.fetchData(this.props.url);
      this.setState({ page: 1, selectedId: null });
    }
  }

  handleSelectedId = (id) => {
    this.setState({ selectedId: id });
  };

  next = async () => {
    if (this.state.page < Math.ceil(this.state.results.length / this.props.resultsPerPage)) {
      let url = `${this.props.url}&page=${this.state.page + 1}`;
      await this.fetchData(url);
      this.setState({ page: this.state.page + 1, selectedId: null });

    }
  };

  prev = async () => {
    if (this.state.page > 1) {
      let url = `${this.props.url}&page=${this.state.page - 1}`;
      await this.fetchData(url);
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
        <div className="container d-flex justify-content-around">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.prev}>&larr; previous</button>
          Page {this.state.page}
          <button type="button" className="btn btn-dark" onClick={this.next}>next &rarr;</button>
        </div>
        {selectedId && <Detail id={selectedId} />}
      </div>
    );
  }
}
