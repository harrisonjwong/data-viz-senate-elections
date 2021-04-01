import React from 'react';

const YearPicker = ({setYear}) => {
  return (
    <div>
      <h5>Select Senate elections</h5>
      <select className='form-control' onChange={e => setYear(e.target.value)}>
        <option value={2020}>2020 (Class 2)</option>
        <option value={2018}>2018 (Class 1)</option>
        <option value={2017}>2017 (special)</option>
        <option value={2016}>2016 (Class 3)</option>
        <option value={2014}>2014 (Class 2)</option>
        <option value={2013}>2013 (special)</option>
        <option value={2012}>2012 (Class 1)</option>
        <option value={2010}>2010 (Class 3)</option>
        <option value={2008}>2008 (Class 2)</option>
        <option value={2006}>2006 (Class 1)</option>
        <option value={2004}>2004 (Class 3)</option>
        <option value={2002}>2002 (Class 2)</option>
        <option value={2000}>2000 (Class 1)</option>
      </select>
    </div>
  )
}

export default YearPicker;