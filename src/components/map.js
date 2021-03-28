import React, {useEffect, useState} from 'react';
// import MapChart from './map-chart';
import USAMap from 'react-usa-map';
import currentService from '../services/current-congress';
import {transformToStateConfig} from '../services/data-transform-service';

const Map = () => {
  const mapHandler = (event) => {
    alert(event.target.dataset.name)
  }
  const [senators, setSenators] = useState({});
  const [currState, setCurrState] = useState('');
  useEffect(() => {
    currentService.getCurrentLegislators()
      .then(members => {
        setSenators(transformToStateConfig(members, setCurrState));
      })
  }, [])

  return (
    <div>
      <h1>Map</h1>
      <div className='row'>
        <div className='col-8'>
          <USAMap customize={senators} onClick={mapHandler}/>
        </div>
        <div className='col-4'>
          {
            currState &&
            <div>
              <h2>{currState}</h2>
              <h4>Senior Senator</h4>
              {senators[currState]['seniorSenator']['name']}
              {senators[currState]['seniorSenator']['party'] === 'Democrat' ? ' (D)' : ' (R)'}
              <h4>Junior Senator</h4>
              {senators[currState]['juniorSenator']['name']}
              {senators[currState]['juniorSenator']['party'] === 'Democrat' ? ' (D)' : ' (R)'}
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Map;