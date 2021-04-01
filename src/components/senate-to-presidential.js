import React, {useEffect, useState} from 'react';
import {getSenateElection} from '../services/data-service';
import {
  getHslRange,
  transformColorsToPresidentialComparison,
  transformSenateResults
} from '../services/data-transform-service';
import {Link} from 'react-router-dom';
import USAMap from 'react-usa-map';
import YearPicker from './helpers/year-picker';
import SpecialElectionsTable from './helpers/special-elections-table';
import RaceResultTable from './helpers/race-result-table';

const SenateToPresidential = ({states}) => {
  const mapHandler = (event) => {
    setCurrState(event.target.dataset.name)
  }
  const [results, setResults] = useState({});
  const [currState, setCurrState] = useState('');
  const [year, setYear] = useState(2020);
  const [presidentialYear, setPresidentialYear] = useState('2020');
  const [presidentialResults, setPresidentialResults] = useState({});

  useEffect(() => {
    getSenateElection(year).then(async res => {
      const transformed = await transformSenateResults(res, setCurrState, states);
      const comparison = await transformColorsToPresidentialComparison(
        transformed, presidentialYear, setPresidentialResults, states);
      setResults(comparison)
    });
  }, [year, presidentialYear, states])

  return (
    <div>
      <div className='row'>
        <div className='col-1'>
          <Link className='mt-1 btn btn-block btn-secondary' to='/'>Back</Link>
        </div>
        <h1 className='col-11'>{year} Senate Elections vs. {presidentialYear} Presidential</h1>
      </div>
      <div className='row'>
        <div className='col-8'>
          <USAMap customize={results} onClick={mapHandler}/>
          <SpecialElectionsTable results={results} setCurrState={setCurrState}/>
        </div>
        <div className='col-4'>
          <YearPicker setYear={setYear}/>
          <div>
            <h5>Select Presidential Year to compare</h5>
            <select className='form-control' onChange={e => setPresidentialYear(e.target.value)}>
              <option value={2020}>2020 (Biden vs. Trump)</option>
              <option value={2016}>2016 (Clinton vs. Trump)</option>
              <option value={2012}>2012 (Obama vs. Romney)</option>
              <option value={2008}>2008 (Obama vs. McCain)</option>
              <option value={2004}>2004 (Kerry vs. Bush)</option>
              <option value={2000}>2000 (Gore vs. Bush)</option>
            </select>
          </div>
          <h5>Key</h5>
          <div>
            <table>
              <tbody>
              <tr>
                {
                  getHslRange().map((color, idx) => {
                    return <td key={idx * Math.random() * 1000}
                               width='7px' height='20px' style={{backgroundColor: color, padding: 0}}/>
                  })
                }
              </tr>
              </tbody>
            </table>
            <div style={{fontSize: 'small'}}>
              More Democratic than Presidential
              <div className='float-right'>
                More Republican than Presidential
              </div>
            </div>
          </div>
          {
            currState &&
            <div>
              <h1>{states[currState] || states[currState.substring(0, 2)] + ' special'}</h1>
              {!results[currState] && <h5>No scheduled Senate election</h5>}
              {
                results[currState] &&
                <div>
                  <h5>Senate Race</h5>
                  <RaceResultTable currState={currState} results={results}/>
                  <h5>Presidential Race</h5>
                  <RaceResultTable currState={currState.includes('-special') ? currState.substring(0, 2) : currState} results={presidentialResults}/>
                </div>
              }
            </div>
          }
        </div>
      </div>
    </div>

  );
}

export default SenateToPresidential;