import React, { useState, useEffect } from 'react';

import '../styles/Timeline.scss';

import quakeData from '../data/moonquakes1979.json';  // Import the JSON file


function Timeline(props) {
  const { setQuake, setCamera } = props;
  const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);

  const years = [1971, 1972, 1973, 1974, 1975, 1976];

  useEffect(() => {
    // Directly set the state using the imported JSON data
    setData(quakeData);
}, []);

  const getQuake = (id) => {
    const selectedQuake = data.find((item) => item._id === id);
    if (selectedQuake) {
      setQuake(selectedQuake);
    } else {
      console.error('Quake not found for given ID:', id);
      // Handle this situation appropriately, maybe set some state or show a message to the user
    }
};


  const degToRad = (deg) => (deg * Math.PI) / 180.0;

  return (
    <div className='timeline'>
      <select
        className='timeline__label'
        value={selectedYear || 'none'}
        onChange={(e) => {
          setSelectedYear(e.target.value);
          setQuake({});
        }}
      >
        <option className='timeline__label__list' value='none' disabled hidden>
          Year
        </option>
        {years.map((year, index) => (
          <option key={index} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select
        className='timeline__label'
        onChange={(e) => {
          getQuake(e.target.value);
        }}
      >
        <option className='timeline__label__list' value='none' hidden>
          Day
        </option>
        {data
          .filter((item) => item.year === selectedYear)
          .map((item, index) => (
            <option className='timeline__label__list' key={index} value={item._id}>
              {item.day}
            </option>
          ))}
      </select>
      <button
        className='apply'
        onClick={() => {
          if (props.quake && props.quake.latitude && props.quake.longitude) {
            setCamera([
              6 * Math.sin(Math.PI / 2 - degToRad(props.quake.latitude)) * Math.sin(degToRad(props.quake.longitude)),
              6 * Math.cos(Math.PI / 2 - degToRad(props.quake.latitude)),
              6 * Math.sin(Math.PI / 2 - degToRad(props.quake.latitude)) * Math.cos(degToRad(props.quake.longitude)),
            ]);
          } else {
            console.log('Quake data is not complete.');
          }
        }}
      >
        Apply
      </button>
    </div>
  );
}

export default Timeline;
