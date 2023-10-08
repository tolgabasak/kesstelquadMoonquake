
import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Link } from 'react-router-dom';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

import BackGround from './BackGround';
import Moon from './Moon';
import Wireframe from './Wireframe';
import Sun from './Sun';
import Wave from './Wave';
import AxesHelper from './AxesHelper';
import Lander from './Lander';
import Menu from './Menu';
import QuakeInfo from './QuakeInfo';
import loader from '../assets/loader.gif';
import Legend from './Legend';

import quakeData from '../data/moonquakes1979.json'; // Importing the quake data

import '../styles/Space.scss';


function QuakePoint({ lat, long, mag, onClick }) {
  const RADIUS = 2; // The radius of the Moon mesh
  const phi = (90 - lat) * (Math.PI / 180); // Latitude to spherical coordinates
  const theta = (long + 180) * (Math.PI / 180); // Longitude to spherical coordinates
  
  const x = -RADIUS * Math.sin(phi) * Math.cos(theta);
  const y = RADIUS * Math.cos(phi);
  const z = RADIUS * Math.sin(phi) * Math.sin(theta);

  const position = [x, y, z];
  const scale = [mag, mag, mag];

  return (
    <mesh position={position} scale={scale} onClick={() => onClick({ lat, long, mag })}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshBasicMaterial color="red" opacity={0.5} transparent={true} />
    </mesh>
  );
}


function transformQuakeData(quakeData) {
  // Check if quakeData is valid
  if (!quakeData) {
    console.error("Invalid quakeData passed to transformQuakeData function:", quakeData);
    return {};
  }
  const date = new Date(quakeData.date);
  return {
    year: date.getFullYear(),
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    seconds: date.getSeconds(),
    latitude: quakeData.lat,
    longitude: quakeData.lng,
    magnitude: quakeData.mag,
    station: { value: quakeData.label }
  };
}


function Space() {
	
  const [axes, setAxes] = useState(0);
  const [directionalLightIntensity, setDirectionalLightIntensity] = useState(50);
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(3);
  const [wireframe, setWireframe] = useState(false);
  const [heightMap, setHeightMap] = useState(false);
  const [apolloLanders, setApolloLanders] = useState(true);
  const [quake, setQuake] = useState(quakeData); // Initialize state with imported data
  const [places, setPlaces] = useState(true);
  const [camera, setCamera] = useState([0, 0, 6]);

  const landerLocation = [
    [1, 23, 11],
    [-3, -23, 12],
    [-3, -17, 14],
    [26, 4, 15],
    [-9, 16, 16],
    [20, 31, 17],
  ];

  return (
    <>
      <Link className='back' to='/'>
        &lt;Back to Home
      </Link>
      <div className='space'>
        <Suspense
          fallback={
            <div className='loader'>
              <img className='loader__img' src={loader} alt='loader' />
            </div>
          }
        >
          <Canvas className='canvas'>
            <PerspectiveCamera makeDefault position={camera} />
            <OrbitControls enableZoom={true} minDistance={3.2} maxDistance={6} enablePan={true} autoRotate={false} />
            <ambientLight intensity={ambientLightIntensity / 100} />
            <spotLight position={[0, 0, 0]} intensity={2} angle={Math.PI} />
            <directionalLight position={[0, 0, 100]} intensity={directionalLightIntensity / 100} angle={-0.3} />
            <BackGround />
            <Moon heightMap={heightMap} />
            {wireframe && <Wireframe />}
            <AxesHelper axes={axes} />
            <Sun />
            {apolloLanders &&
              landerLocation.map((lander, index) => {
                const name = lander[3] || `Apollo ${lander[2]}`;
                return <Lander key={index} lat={lander[0]} long={lander[1]} num={lander[2]} name={name} />;
              })}
            {quake.map((q, index) => {
              const transformedQuake = transformQuakeData(q);
              return (
                <QuakePoint key={index} lat={transformedQuake.latitude} long={transformedQuake.longitude} mag={transformedQuake.magnitude} onClick={() => setQuake(transformedQuake)} />
              );
            })}
            <Wave quake={quake} />
          </Canvas>
        </Suspense>
      </div>
      <Menu
        axes={axes}
        setAxes={setAxes}
        directionalLightIntensity={directionalLightIntensity}
        setDirectionalLightIntensity={setDirectionalLightIntensity}
        ambientLightIntensity={ambientLightIntensity}
        setAmbientLightIntensity={setAmbientLightIntensity}
        wireframe={wireframe}
        setWireframe={setWireframe}
        heightMap={heightMap}
        setHeightMap={setHeightMap}
        apolloLanders={apolloLanders}
        setApolloLanders={setApolloLanders}
        quake={quake}
        setQuake={setQuake}
        places={places}
        setPlaces={setPlaces}
        setCamera={setCamera}
      />
      <QuakeInfo quake={quake} />
      {heightMap && <Legend />}
    </>
  );
}

export default Space;
