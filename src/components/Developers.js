import React from 'react';

import tolga from '../assets/tolga.jpg';
import ulas from '../assets/ulas2.jpg';
import mehmet from '../assets/mehmet2.jpg';

import { AiOutlineLinkedin } from 'react-icons/ai';
import { VscGithub } from 'react-icons/vsc';

import '../styles/Developers.scss';

function Developers() {
  return (
    <div className='developers'>
      <div className='developers__header'>Our Team:</div>
      <ul className='developers__list'>
        <div className='row'>
          <li classname='developers__list__item'>
            <img className='developers__list__item__img' src={tolga} alt='' />
            <div className='developers__list__item__name'>Tolga Basak</div>
            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/tolgabasak/' className='developers__list__item__logo'>
              <AiOutlineLinkedin />
            </a>
            <a target='_blank' rel='noreferrer' href='https://github.com/tolgabasak' className='developers__list__item__logo'>
              <VscGithub />
            </a>
          </li>
          <li classname='developers__list__item'>
            <img className='developers__list__item__img' src={mehmet} alt='' />
            <div className='developers__list__item__name'>Mehmet Yalcin</div>
            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/mehmet-yalçın-118235256/' className='developers__list__item__logo'>
              <AiOutlineLinkedin />
            </a>
          </li>
        </div>
        <div className='row'>
          <li classname='developers__list__item'>
            <img className='developers__list__item__img' src={ulas} alt='' />
            <div className='developers__list__item__name'>Ulas Karadas</div>
            <a target='_blank' rel='noreferrer' href='https://www.linkedin.com/in/ulaş-karadaş-8a44b9295' className='developers__list__item__logo'>
              <AiOutlineLinkedin />
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Developers;
