import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import '../styles/Hero.scss';

function Hero() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setIsLoading(true);
  };

  useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        navigate('/model');
      }, 2000); // 2000ms or 2s delay for the loading animation
    }
  }, [isLoading, navigate]);

  return (
    <div className='hero'>
      <div className='hero__title'>
        <div className='hero__title__main'>MOONQUAKE MAP 2.0 by kesstel quad</div>
        <div className='hero__title__sub'>Moonquake Map between 1969-1976</div>
      </div>
      <div className='hero__links'>
        {isLoading ? (
          <img src='/rocket.png' alt='Loading...' className='loading-rocket' />
        ) : (
          <div onClick={handleClick} className='hero__links__link'>
            &lt;Begin Journey&gt;
          </div>
        )}
      </div>
    </div>
  );
}

export default Hero;
