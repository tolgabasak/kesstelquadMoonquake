import React, { useRef } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

import '../styles/Lander.scss';

export default function Lander(props) {
  const group = useRef();

  const { lat, long, num, name } = props; // Add 'name' to the destructuring
  const degToRad = (deg) => (deg * Math.PI) / 180.0;

  useFrame(() => {
    group.current.lookAt(0, 0, 0);
  });

  const r = 2;

  const { nodes, materials } = useGLTF('/lander.glb');
  return (
    <group
      ref={group}
      {...props}
      dispose={null}
      scale={0.0005}
      position={[
        r * Math.sin(Math.PI / 2 - degToRad(lat)) * Math.sin(degToRad(long)),
        r * Math.cos(Math.PI / 2 - degToRad(lat)),
        r * Math.sin(Math.PI / 2 - degToRad(lat)) * Math.cos(degToRad(long)),
      ]}
    >
      <mesh geometry={nodes.Apollo_lunar_module.geometry} material={materials['Material.001']} rotation={[-Math.PI / 2, 0, 0]} />
      <Html distanceFactor={10}>
        <div className='info'>{name || num}</div> {/* Display 'name' or 'num' */}
      </Html>
    </group>
  );
}

useGLTF.preload('/lander.glb');
