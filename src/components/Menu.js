


import React from 'react';
import '../styles/Menu.scss';
import Timeline from './Timeline';

function Menu(props) {
  const {
    directionalLightIntensity,
    setDirectionalLightIntensity,
    heightMap,
    setHeightMap,
    apolloLanders,
    setApolloLanders,
    quake,
    setQuake,
    setCamera,
  } = props;

  return (
    <div className='bottom-container'>
    
      <div className='menu-container'>
        <div className='menu'>
          <table className='table table__1'>
          <tbody>
            <tr>
              <td className='td__info'>Height Map</td>
              <td>
                <button
                  className='btn'
                  onClick={() => {
                    setHeightMap(!heightMap);
                  }}
                >
                  {heightMap === true ? 'On' : 'Off'}
                </button>
              </td>
            </tr>
            <tr>
              <td className='td__info'>Apollo Landers</td>
              <td>
                <button
                  className='btn'
                  onClick={() => {
                    setApolloLanders(!apolloLanders);
                  }}
                >
                  {apolloLanders === true ? 'On' : 'Off'}
                </button>
              </td>
            </tr>
            <tr>
              <td className='td__info'>
                <div className='data'>
                  Directional Light Intensity
                  <span>{directionalLightIntensity}</span>
                </div>
                <input
                  type='range'
                  min={0}
                  max={100}
                  value={directionalLightIntensity}
                  onChange={(e) => {
                    setDirectionalLightIntensity(e.target.value);
                  }}
                />
              </td>
              <td>
                <button
                  className='btn'
                  onClick={() => {
                    setDirectionalLightIntensity(50);
                  }}
                >
                  Reset
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>
      <div className='timeline-overlay'>
        <Timeline quake={quake} setQuake={setQuake} setCamera={setCamera} />
      </div>
    </div>
  );
}

export default Menu;

