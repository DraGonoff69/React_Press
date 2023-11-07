import React, { Component } from 'react';
import Newsitem from './Newsitem';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps={
    country: 'in',
    category:''
  }
  static propTypes={
    country: PropTypes.string,
    category: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [], // Initialize articles as an empty array
      loading: false,
    };
  }
  
  
  
  async componentDidMount() {
    try {
      let url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37cd3880f1074eb4be38d49214bc42ac`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ articles: parsedData.articles });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  render() {
    return (
      <div className='container my-3'>
        <h1 className="text-center" style={{ margin: '40px 0px' }}>ReactPress - {this.props.category}</h1>
        <div className='row'>
          {this.state.articles && this.state.articles.map((element) => {
            return (
              <div className='col-md-4' key={element.url}>
                <NewsItem
                  title={element.title ? element.title : ''}
                  description={element.description ? element.description : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        {/* Infinite Scroll */}
      </div>
    );
  }
}

export default News;
