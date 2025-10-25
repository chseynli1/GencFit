import React from "react";
import HomeSlider from "../../shared/components/HomeSlider";
import HeroSection from "../../shared/components/HeroSection";
import StepsSection from "../../shared/components/StepsSection";
import ExperienceSection from "@/shared/components/ExperienceSection";
const Home = ({ searchResults }) => {
  return (
    <div>
      <HomeSlider />
      <HeroSection />
      <StepsSection />
      <ExperienceSection searchResults={searchResults} />
    </div>
  );
};

export default Home;
