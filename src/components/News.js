import React, { Component } from 'react';
import Newsitem from './Newsitem';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
  static defaultProps = {
    country: 'in',
    category: ''
  }
  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string
  }
  constructor() {
    super();
    this.state = {
      articles: [], // Initialize articles as an empty array
      loading: false,
      totalResults:0
    };
  }



  async updateNews() {
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37cd3880f1074eb4be38d49214bc42ac`;
      this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({ 
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading:false
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

   fetchMoreData= async()=>{
    this.setState({page:this.state.page +1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=37cd3880f1074eb4be38d49214bc42ac`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ 
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading:false
    });
  };

  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: '40px 0px' }}>ReactPress - {this.props.category}</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length} //This is important field to render the next data
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={this.refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
          {items}
        <div className="container">

        <div className='row'>
          {this.state.articles && this.state.articles.map((element) => {
            return (
              <div className='col-md-4' key={element.url}>
                <Newsitem
                  title={element.title ? element.title : ''}
                  description={element.description ? element.description : ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  
                />
              </div>
            );
          })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
