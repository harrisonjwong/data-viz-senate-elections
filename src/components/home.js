import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>U.S. Senate Data Visualization</h1>
      <ul className='list-group'>
        <li className='list-group-item' key='current'>
          <Link to='/current-senators'>Current Senators</Link>
        </li>
        <li className='list-group-item' key='elections'>
          <Link to='/elections'>Historical Senate Elections</Link>
        </li>
        <li className='list-group-item' key='margin'>
          <Link to='/margin-of-victory'>Margin of Victory</Link>
        </li>
        <li className='list-group-item' key='presidential'>
          <Link to='/senate-to-presidential'>Senate vs. Presidential Margin </Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;