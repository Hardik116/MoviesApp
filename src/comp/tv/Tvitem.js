import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Tvitem extends Component {
  render() {
    const { id, title, desc, imgurl, rating } = this.props;
    const formattedRating = parseFloat(rating).toFixed(1);

    return (
      <div className="my-3">
        <div className="card" style={{ width: "18rem", border: 'none' }}>
          <img src={`https://image.tmdb.org/t/p/w500${imgurl}`} className="card-img-top" alt="..." />
          <div className="card-body" style={{ backgroundColor: '#282828' }}>
            <h5 style={{ height: '50px', overflow: 'hidden', color: '#ce5445' }} className="card-title">{title}</h5>
            <p style={{ height: '80px', overflow: 'hidden', color: 'white' }} className="card-text">{desc}...</p>
            <p style={{ color: 'yellow' }} className="card-text">Rating: {formattedRating}/10</p>
            <Link
              to={`/Tvdetail/${id}`} 
              className="btn btn-light"
            >
              View Detail
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
