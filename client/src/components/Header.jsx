import React from 'react';
import {AiFillStar} from 'react-icons/ai'
import {AiFillGithub} from 'react-icons/ai'

export default function Header() {
  return <header className='header'>
      <h1 className='header--title'>Crypto Updates India<sup style={
        {
          fontSize: "14px",
          color: "green"
        }
        }>v1</sup></h1>
      <p className='header--subtitle'>Latest prices and headlines</p>
      <a 
        href='https://github.com/manish-mehra/crypto-updates-india' 
        target='_blank'
        className='header--githubLink'
      ><AiFillStar/> This Project</a>
      
  </header>
}
