import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Senate Data Visualization</h1>
      <ul className='list-group'>
        <li className='list-group-item' key='current'>
          <Link to='/current-senators'>Current Senators</Link>
        </li>
        <li className='list-group-item' key='elections'>
          <Link to='/elections'>Historical Senate Elections</Link>
        </li>
      </ul>
    </div>
  );
}

export default Home;