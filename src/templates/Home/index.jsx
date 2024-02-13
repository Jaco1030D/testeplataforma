import React from 'react'
import Main from '../../components/others/Main'
import axios from 'axios'
import Company from '../Company'
import ContactTiago from '../../components/layout/ContactTiago'
import EvaluatedProjects from '../../components/layout/EvaluatedProjects'
import ServicesOffered from '../../components/layout/ServicesOffered'
import FeedBack from '../../components/layout/FeedBack'
import FooterHome from '../../components/layout/FooterHome'
import CompanyTrustUs from '../../components/layout/CompanyTrustUs'
import { icons, textsContactTiago, textsEvaluatedProjects, textsFeedBack, textsServiceOffered } from '../../constants'

const Home = () => {
  
  return (
    <div>
        <Main />
        <ContactTiago text={textsContactTiago} />
        <EvaluatedProjects text={textsEvaluatedProjects} />
        <CompanyTrustUs text={"Empresas Que Confiam Em Nós"} icons={icons} />
        <ServicesOffered text={textsServiceOffered} />
        <FeedBack text={textsFeedBack} />
        <FooterHome />
    </div>
  )
}

export default Home