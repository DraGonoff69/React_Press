import React, { Component } from 'react'

export class Newsitem extends Component 
{
    render() 
    {
        let {title,description,imageUrl, newsUrl}=this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imageUrl?"https://c.ndtvimg.com/2023-07/q6mas5ug_heat-generic_625x300_27_July_23.jpg":imageUrl}  className="card-img-top"  alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}
                        </p>
                        <a href={newsUrl} target='blank'  className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default Newsitem
