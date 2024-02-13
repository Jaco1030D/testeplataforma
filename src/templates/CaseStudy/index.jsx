import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FooterCompany from '../../components/layout/FooterCommunity'
import { icons, textsFeedBackCaseStudyShopee, textsFeedBackCaseStudyZF, textsFooterCompany, textsHomeCaseStudyShopee, textsHomeCaseStudyZF, textsMainCaseStudyShopee, textsMainCaseStudyZF } from '../../constants'
import CompanyTrustUs from '../../components/layout/CompanyTrustUs'
import FeedBackCaseStudy from '../../components/layout/FeedBackCaseStudy'
import HomeCompany from '../../components/layout/HomeCompany'
import MainCaseStudy from '../../components/layout/MainCaseStudy'
import HeroCasyStudy from '../../components/layout/HeroCasyStudy'

const CaseStudy = () => {
    const {type} = useParams()
    const navigate = useNavigate()
    const [typeText, setTypeText] = useState()

    
    useEffect(() => {

      if (type === 'zf') {
        setTypeText({
          textsHomeCaseStudy: textsHomeCaseStudyZF,
          textsMainCaseStudy: textsMainCaseStudyZF,
          textsFeedBackCaseStudy: textsFeedBackCaseStudyZF
        })

      } else if (type === 'shopee') {
        setTypeText({
          textsHomeCaseStudy: textsHomeCaseStudyShopee,
          textsMainCaseStudy: textsMainCaseStudyShopee,
          textsFeedBackCaseStudy: textsFeedBackCaseStudyShopee
        })
      } 

    },[type])
    
  return (
    <div>
        {typeText?.textsHomeCaseStudy && (
          <>
          <HeroCasyStudy text={typeText?.textsHomeCaseStudy} />
          <MainCaseStudy text={typeText?.textsMainCaseStudy} />
          <FeedBackCaseStudy texts={typeText?.textsFeedBackCaseStudy} />
          </>
        )}
        <CompanyTrustUs alternative text={"Empresas Que Confiam Em Nós"} icons={icons} />
        <FooterCompany alternative text={textsFooterCompany} />
    </div>
  )
}

export default CaseStudy