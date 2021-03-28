import React from 'react';

const RaceResultTable = ({results, currState}) => {
  return (
    <table className='table'>
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
        <td>{results[currState].winnerPct}</td>
      </tr>
      <tr>
        <td>{results[currState].secondParty}</td>
        <td>{results[currState].secondName}</td>
        <td>{results[currState].secondPct}</td>
      </tr>
      {
        results[currState].winnerPct + results[currState].secondPct < 100 &&
        <tr>
          <td>Other</td>
          <td>---</td>
          <td>{Number.parseFloat(100 - results[currState].winnerPct - results[currState].secondPct).toFixed(1)}</td>
        </tr>
      }
      <tr>
        <th>Margin</th>
        <th>{results[currState].winnerParty}</th>
        <th>+{Number.parseFloat(results[currState].winnerPct - results[currState].secondPct).toFixed(1)}</th>
      </tr>
      </tbody>
    </table>
  )
}

export default RaceResultTable;