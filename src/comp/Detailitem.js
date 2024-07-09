import React, { Component } from 'react'

export default class Detailitem extends Component {
  render() {
    let { title,imgurl,desc,runtime,lang,date,rating,genre} = this.props;
    const formattedRating = parseFloat(rating).toFixed(1);

    return (
        <div className="d-flex align-items-center">
            <div >
              <img style={{height:'130%',width:'130%'}} src={`https://image.tmdb.org/t/p/w500${imgurl}`} alt="..." />
            </div>
          <div className='container'  style={{ paddingLeft: '150px' }}>
            <h2 style={{ overflow: 'hidden', color: '#0ba3d6' }} >{title}</h2>
            <p style={{color:'white'}}>{desc}</p>
            <p style={{color:'white'}}> {runtime} minutes</p>
            <p style={{ color: 'white' }}><span style={{ color: '#f50713',fontWeight: 'bold' }}>Language : </span>{lang}</p>
            <p style={{ color: 'white' }}><span style={{ color: '#f50713',fontWeight: 'bold' }}>Release Date : </span>{date}</p>
            <p style={{ color: 'white' }}><span style={{ color: '#d0de14',fontWeight: 'bold' }}>Rating :  </span>{formattedRating}/10</p>
            <p style={{ color: 'white' }}><span style={{ color: '#4bad3e',fontWeight: 'bold' }}>Genre :   </span>{genre}</p>
            </div>
          </div>
    )
  }
}

