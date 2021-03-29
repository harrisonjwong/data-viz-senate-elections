import React, {useEffect, useState} from 'react';
import {getSenateElection} from '../services/data-service';
import {transformSenateResults} from '../services/data-transform-service';
import USAMap from 'react-usa-map';
import {Link} from 'react-router-dom';
import YearPicker from './helpers/year-picker';
import RaceResultTable from './helpers/race-result-table';
import SpecialElectionsTable from './helpers/special-elections-table';

const SenateElection = ({states}) => {
  const mapHandler = (event) => {
    setCurrState(event.target.dataset.name)
  }
  const [results, setResults] = useState({});
  const [currState, setCurrState] = useState('');
  const [year, setYear] = useState(2020);
  useEffect(() => {
    getSenateElection(year).then(async res => {
      const transformed = await transformSenateResults(res, setCurrState, states);
      setResults(transformed)
    });
  }, [year, states]);
  return (
    <div>
      <div className='row'>
        <div className='col-1'>
          <Link className='mt-1 btn btn-block btn-secondary' to='/'>Back</Link>
        </div>
        <h1 className='col-11'>{year} Senate Elections</h1>
      </div>
      <div className='row'>
        <div className='col-8'>
          <USAMap customize={results} onClick={mapHandler}/>
          <SpecialElectionsTable results={results} setCurrState={setCurrState}/>
        </div>
        <div className='col-4'>
          <YearPicker setYear={setYear}/>
          <h5>Key</h5>
          <div className='p-1' style={{color: 'white', backgroundColor: 'firebrick'}}>Republican gain</div>
          <div className='p-1' style={{color: 'white', backgroundColor: 'royalblue'}}>Democratic gain</div>
          <div className='p-1' style={{color: 'white', backgroundColor: 'lightcoral'}}>Republican hold</div>
          <div className='p-1' style={{color: 'white', backgroundColor: 'lightskyblue'}}>Democratic hold</div>
          {
            currState &&
            <div>
              <h1>{states[currState] || states[currState.substring(0, 2)] + ' special'}</h1>
              {!results[currState] && <h5>No regularly scheduled senate election</h5>}
              {
                results[currState] &&
                <RaceResultTable currState={currState} results={results}/>
              }
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SenateElection;