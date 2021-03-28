import React, {useEffect, useState} from 'react';
import {getSenateElection} from '../services/data-service';
import {transformColorsToMarginOfVictory, transformSenateResults} from '../services/data-transform-service';
import {Link} from 'react-router-dom';
import USAMap from 'react-usa-map';
import YearPicker from './helpers/year-picker';
import SpecialElectionsTable from './helpers/special-elections-table';
import RaceResultTable from './helpers/race-result-table';

const MarginOfVictory = () => {
  const mapHandler = (event) => {
    setCurrState(event.target.dataset.name)
  }
  const [results, setResults] = useState({});
  const [currState, setCurrState] = useState('');
  const [year, setYear] = useState(2020);

  useEffect(() => {
    getSenateElection(year).then(async res => {
      const transformed = await transformSenateResults(res, setCurrState);
      setResults(transformColorsToMarginOfVictory(transformed))
    });
  }, [year])

  const getHslRange = () => {
    const result = [];
    for (let i = 70; i >= 0; i--) {
      result.push(`hsl(${236}, 100%, ${96 - i}%`);
    }
    for (let i = 0; i < 70; i++) {
      result.push(`hsl(${0}, 100%, ${96 - i}%)`);
    }
    return result;
  }

  return (
    <div>
      <div className='row'>
        <div className='col-1'>
          <Link className='mt-1 btn btn-block btn-secondary' to='/'>Back</Link>
        </div>
        <h1 className='col-11'>{year} U.S. Senate Elections - Margin of Victory</h1>
      </div>
      <div className='row'>
        <div className='col-8'>
          <USAMap customize={results} onClick={mapHandler}/>
          <SpecialElectionsTable results={results} setCurrState={setCurrState}/>
        </div>
        <div className='col-4'>
          <YearPicker setYear={setYear}/>
          <h5>Key</h5>
          <div>
            <table>
              <tbody>
              <tr>
                {
                  getHslRange().map(color => {
                    return <td width='7px' height='20px' style={{backgroundColor: color, padding: 0}}/>
                  })
                }
              </tr>
              </tbody>
            </table>
            <div>
              Larger Democratic Victory
              <div className='float-right'>
                Larger Republican Victory
              </div>
            </div>
          </div>
          <br/>
          {
            currState &&
            <div>
              <h1>{currState}</h1>
              {!results[currState] && <h5>No regularly scheduled Senate election</h5>}
              {
                results[currState] &&
                <RaceResultTable currState={currState} results={results}/>
              }
            </div>
          }
        </div>
      </div>
    </div>

  );
}

export default MarginOfVictory;