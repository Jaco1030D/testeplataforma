import React from 'react'
import elipse from './elipse.svg'
import './style.css'
import TextMainCaseStudy from '../../others/TextMainCaseStudy';

const MainCaseStudy = ({text}) => {
  console.log(text);
  return (
    <div className='mainCaseStudy-container'>
        <img width={'617px'} height={'592'} src={text.img} alt="" />
        <img className='mainCaseStudy-elipse' src={elipse} alt="" />

        <TextMainCaseStudy text={text} />
    </div>
  )
}

export default MainCaseStudy