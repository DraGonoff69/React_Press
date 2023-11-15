import React, { useState, useEffect } from 'react';
import NewsItem from './Newsitem';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from './Spinner';

const News = ({ country = 'in', category = '' }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const updateNews = async () => {
    try {
      setLoading(true);
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=512387be676c42d7a8dbb489d0627819`;
      const data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.articles.length === 0) {
        setError(true); // No news found
      } else {
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setPage(prevPage => prevPage + 1); // Increment the page after fetching initial data
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(true); // Set error to display copyright message
    }
  };

  const fetchMoreData = async () => {
    try {
      const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&apiKey=512387be676c42d7a8dbb489d0627819`;
      const data = await fetch(url);
      const parsedData = await data.json();
      if (parsedData.articles.length === 0) {
        setError(true); // No more news to fetch
      } else {
        setArticles(prevArticles => [...prevArticles, ...parsedData.articles]);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        setPage(prevPage => prevPage + 1); // Increment the page for the next fetch
      }
    } catch (error) {
      console.error('Error fetching more data:', error);
      setError(true); // Set error to display copyright message
    }
  };

  useEffect(() => {
    updateNews();
  }, []); // Empty dependency array to run only once on mount

  useEffect(() => {
    if (articles.length === 0 && loading === false) {
      setShowFooter(true);
    }
  }, [articles, loading]);

  return (
    <>
      <h1 className="text-center" style={{ margin: '40px 0px' }}>ReactPress - {category}</h1>
      {loading && <Spinner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length < totalResults}
        loader={<Spinner />}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Wait!! Your News is Loading</b>
          </p>
        }
        refreshFunction={updateNews}

      >
        <div className="container" style={{ marginBottom: '20px' }}>
          <div className='row'>
            {articles.map(element => (
              <div className='col-md-4' key={element.url}>
                <NewsItem
                  title={element.title || ''}
                  description={element.description || ''}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>

      {showFooter && (
        <footer style={{ textAlign: 'center', marginTop: '20px' }}>
          <p>©2023 ReactPress. All rights reserved.</p>
        </footer>
      )}
    </>
  );
};

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string
};

export default News;
