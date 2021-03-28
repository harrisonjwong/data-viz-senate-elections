import React from 'react';

const SpecialElectionsTable = ({results, setCurrState}) => {
  return (
    <table className='table'>
      <thead>
      <tr>
        {Object.keys(results).filter(k => k.includes('-special')).map(key => {
          return (
            <td key={key} style={{border: 'solid', color: 'white', backgroundColor: results[key].fill}}
                onClick={() => setCurrState(key)}>
              {key}
            </td>
          )
        })}
      </tr>
      </thead>
    </table>
  );
}

export default SpecialElectionsTable;