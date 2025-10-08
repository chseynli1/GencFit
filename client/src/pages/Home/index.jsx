import React from 'react'
import HomeSlider from '../../shared/components/HomeSlider'
import HeroSection from '../../shared/components/HeroSection'
import StepsSection from '../../shared/components/StepsSection'
import ExperienceSection from '@/shared/components/ExperienceSection'
import ChatWidget from '@/shared/components/ChatWidget/chatWidget'
const Home = ({searchResults }) => {

  return (
    <div>
      <HomeSlider />
      <HeroSection />
      <StepsSection />
      <ExperienceSection searchResults={searchResults }/>
      <ChatWidget />
    </div>
  )
}

export default Home
