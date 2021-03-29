import React from 'react';

const RaceResultTable = ({results, currState}) => {
  return (
    <table className='table table-sm'>
      <thead>
      <tr>
        <th>Party</th>
        <th>Name</th>
        <th>Percent</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>{results[currState].winnerParty}</td>
        <td>{results[currState].winnerName}</td>
        <td>{Number.parseFloat(results[currState].winnerPct).toFixed(2)}</td>
      </tr>
      <tr>
        <td>{results[currState].secondParty}</td>
        <td>{results[currState].secondName}</td>
        <td>{Number.parseFloat(results[currState].secondPct).toFixed(2)}</td>
      </tr>
      {
        false && results[currState].winnerPct + results[currState].secondPct < 100 &&
        <tr>
          <td>Other</td>
          <td>---</td>
          <td>{Number.parseFloat(100 - results[currState].winnerPct - results[currState].secondPct).toFixed(2)}</td>
        </tr>
      }
      <tr>
        <th>Margin</th>
        <th>{results[currState].winnerParty}</th>
        <th>+{Number.parseFloat(results[currState].winnerPct - results[currState].secondPct).toFixed(2)}</th>
      </tr>
      </tbody>
    </table>
  )
}

export default RaceResultTable;