import React, { Component } from 'react'

export default class Detailitem extends Component {
  render() {
    let {author,date,content} = this.props;
    return (
      
        <div>
            <div className="d-flex justify-content-between">
            <p style={{ color: 'yellow' }}>{author}</p>
            <p style={{ color: 'green' }}>{date}</p>
            </div>
            <div>
            <p style={{ color: 'white' }}>{content}</p>
            </div>
        </div>
    )
  }
}

