import React, {useState, useEffect} from 'react';
import {getSenateElection} from '../services/data-service';
import {transformSenateResults} from '../services/data-transform-service';
import {Link} from 'react-router-dom';
import USAMap from 'react-usa-map/src';

const MarginOfVictory = () => {
  // const mapHandler = (event) => {
  //   alert(event.target.dataset.name)
  // }
  // const [results, setResults] = useState({});
  // const [currState, setCurrState] = useState('');
  // const [year, setYear] = useState(2020);
  // useEffect(() => {
  //   getSenateElection(year).then(async res => {
  //     const transformed = await transformSenateResults(res, setCurrState);
  //     setResults(transformed)
  //   });
  // }, [year])
  return (
    <h1>Margin</h1>
    // <div>
    //   <div className='row'>
    //     <div className='col-1'>
    //       <Link className='mt-1 btn btn-block btn-secondary' to='/'>Back</Link>
    //     </div>
    //     <h1 className='col-11'>{year} U.S. Senate Elections</h1>
    //   </div>
    //   <div className='row'>
    //     <div className='col-8'>
    //       <USAMap customize={results} onClick={mapHandler}/>
    //       <table className='table'>
    //         <thead>
    //         <tr>
    //           {Object.keys(results).filter(k => k.includes('-special')).map(key => {
    //             return (
    //               <td key={key} style={{color: 'white', backgroundColor: results[key].fill}}
    //                   onClick={() => setCurrState(key)}>
    //                 {key}
    //               </td>
    //             )
    //           })}
    //         </tr>
    //         </thead>
    //       </table>
    //     </div>
    //     <div className='col-4'>
    //       <h5>Select a year</h5>
    //       <select className='form-control' onChange={e => setYear(e.target.value)}>
    //         <option value={2020}>2020 (Class 2)</option>
    //         <option value={2018}>2018 (Class 1)</option>
    //         <option value={2016}>2016 (Class 3)</option>
    //       </select>
    //       <h5>Key</h5>
    //       <div className='p-1' style={{color: 'white', backgroundColor: 'firebrick'}}>Republican gain</div>
    //       <div className='p-1' style={{color: 'white', backgroundColor: 'royalblue'}}>Democratic gain</div>
    //       <div className='p-1' style={{color: 'white', backgroundColor: 'lightcoral'}}>Republican hold</div>
    //       <div className='p-1' style={{color: 'white', backgroundColor: 'lightskyblue'}}>Democratic hold</div>
    //       {
    //         currState &&
    //         <div>
    //           <h1>{currState}</h1>
    //           {!results[currState] && <h5>No regularly scheduled senate election</h5>}
    //           {
    //             results[currState] &&
    //             <table className='table'>
    //               <thead>
    //               <tr>
    //                 <th>Party</th>
    //                 <th>Name</th>
    //                 <th>Percent</th>
    //               </tr>
    //               </thead>
    //               <tbody>
    //               <tr>
    //                 <td>{results[currState].winnerParty}</td>
    //                 <td>{results[currState].winnerName}</td>
    //                 <td>{results[currState].winnerPct}</td>
    //               </tr>
    //               <tr>
    //                 <td>{results[currState].secondParty}</td>
    //                 <td>{results[currState].secondName}</td>
    //                 <td>{results[currState].secondPct}</td>
    //               </tr>
    //               {results[currState].winnerPct + results[currState].secondPct < 100 && <tr>
    //                 <td>Other</td>
    //                 <td>---</td>
    //                 <td>{Number.parseFloat(100 - results[currState].winnerPct - results[currState].secondPct).toFixed(1)}</td>
    //               </tr>}
    //               <tr>
    //                 <th>Spread</th>
    //                 <th>{results[currState].winnerParty}</th>
    //                 <th>+{Number.parseFloat(results[currState].winnerPct - results[currState].secondPct).toFixed(1)}</th>
    //               </tr>
    //               </tbody>
    //             </table>
    //           }
    //         </div>
    //       }
    //     </div>
    //   </div>
    // </div>
  )
}
export default MarginOfVictory;