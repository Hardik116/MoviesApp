import React, { Component } from 'react';

export default class Actor extends Component {
  render() {
    let { title, imgurl,role } = this.props;

    return (
      <div className="card" style={{ width: '13rem', border: 'none',marginTop:"20px"}}>
        <img
          // style={{ maxWidth: '100%', height: '10' }}
          src={`https://image.tmdb.org/t/p/w500${imgurl}`}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body" style={{ backgroundColor: '#282828' }}>
          <h5 style={{height:"50px",overflow: 'hidden', color: '#ce5445' }} className="card-title">
            {title}
          </h5>
          <p style={{color:"white" ,height:"30px"}}>Role : {role}</p>
          
        </div>
      </div>
    );
  }
}
