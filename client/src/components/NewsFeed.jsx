import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNews } from '../redux/newsSlice';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const NewsFeed = ({ category }) => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.articles);

  useEffect(() => {
    socket.emit('subscribe', category);
    socket.on('new-article', (article) => {
      dispatch(addNews(article));
    });

    return () => socket.off('new-article');
  }, [category]);

  return (
    <div>
      <h2>{category} News</h2>
      {news.map((article, index) => (
        <div key={index} className="card">
          <h3>{article.title}</h3>
          <p>{article.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NewsFeed;