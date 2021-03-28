import React, {useEffect, useState} from 'react';
import USAMap from 'react-usa-map';
import currentService from '../services/data-service';
import {transformToStateConfig} from '../services/data-transform-service';
import {Link} from 'react-router-dom';

const CurrentSenators = () => {
  const mapHandler = (event) => {
    console.log(event.target.dataset.name)
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
      <div className='row'>
        <div className='col-1'>
          <Link className='mt-1 btn btn-block btn-secondary' to='/'>Back</Link>
        </div>
        <h1 className='col-11'>Current Senators</h1>
      </div>
      <div className='row'>
        <div className='col-8'>
          <USAMap customize={senators} onClick={mapHandler}/>
        </div>
        <div className='col-4'>
          <h5>Key</h5>
          <div>
            <div className='p-1' style={{color: 'white', backgroundColor: 'red'}}>Two Republican Senators</div>
            <div className='p-1' style={{color: 'white', backgroundColor: 'blue'}}>Two Democratic Senators</div>
            <div className='p-1' style={{color: 'white', backgroundColor: 'purple'}}>One Republican Senator and one Democratic Senator</div>
            <div style={{fontStyle: 'italic', fontSize: 'small'}}>Note: Angus King (I-ME) and Bernie Sanders(I-VT) are independents caucusing with the Democrats.</div>
          </div>
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

export default CurrentSenators;