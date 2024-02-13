import React from 'react'
import icon from './teste.svg'
import CompanyTrustUs from '../../components/layout/CompanyTrustUs'
import ServicesOffered from '../../components/layout/ServicesOffered'
import FeedBack from '../../components/layout/FeedBack'
import FooterHome from '../../components/layout/FooterHome'
import EvaluatedProjects from '../../components/layout/EvaluatedProjects'
import ContactTiago from '../../components/layout/ContactTiago'
import { icons, textsContactTiago, textsEvaluatedProjects, textsEvaluatedProjectssecond, textsExampleTraduction, textsExpert, textsFeedBack, textsFooterCompany, textsHomeCompany, textsServiceOffered } from '../../constants'
import HomeCompany from '../../components/layout/HomeCompany'
import ExpertiseSection from '../../components/layout/ExpertiseSection'
import ExampleTraduction from '../../components/layout/ExampleTraduction'
import FooterCompany from '../../components/layout/FooterCommunity'




const Company = () => {
  return (
    <div>
        <HomeCompany text={textsHomeCompany} />
        <EvaluatedProjects type={2} text={textsEvaluatedProjectssecond} action='/caseStudy/zf' />
        <CompanyTrustUs gradient text={"Empresas Que Confiam Em Nós"} icons={icons} />
        <ServicesOffered type={2} text={textsServiceOffered} />
        <ExpertiseSection text={textsExpert} />
        <FeedBack alternative text={textsFeedBack} />
        <ExampleTraduction text={textsExampleTraduction} />
        <FooterCompany text={textsFooterCompany} />
    </div>
  )
}

export default Company