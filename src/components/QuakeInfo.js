import React from 'react';
import '../styles/QuakeInfo.scss';
import earthquakeGif from '../assets/moonquakedetect.gif'; // Import the GIF

function QuakeInfo(props) {
  const { quake } = props;

  if (!quake || Object.keys(quake).length === 0) {
    return null; // or you can return a fallback UI here
  }

  const { 
    year, 
    day, 
    hour, 
    minute, 
    seconds, 
    latitude, 
    longitude, 
    magnitude, 
    station = [] // ensure that station defaults to an array if it doesn't exist
  } = quake;

  return (
    <div className='quakeInfo'>
      <div className='quakeInfo__header'>Quake Details: </div>
      <div className='quakeInfo__body'>
        Year: {year}
        <br />
        Day: {day}
        <br />
        Time of detection(hour: minute: second): {hour}:{minute}:{seconds}
        <br />
        Location:
        <br />
        &emsp;Latitude: {latitude}
        <br />
        &emsp;Longitude: {longitude}
        <br />
        Magnitude: {magnitude}
        <br />
        Quake Detected by Stations: 
		    {station.length === 0
		        ? ' Insufficient Data'
		        : station.map((st, index) => {
		            return <span key={index}>{st.value} </span>;  // Added key prop
		        })}
      </div>
      <img src={earthquakeGif} alt="Earthquake animation" className="quakeInfo__gif" />  {/* Display the GIF */}
    </div>
  );
}

export default QuakeInfo;
