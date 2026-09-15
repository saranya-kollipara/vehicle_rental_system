import React from 'react';
import { HeroSection } from '../../components/home/HeroSection';
import { SearchBox } from '../../components/home/SearchBox';
import { PopularVehicles } from '../../components/home/PopularVehicles';
import { Categories } from '../../components/home/Categories';
import { HowItWorks } from '../../components/home/HowItWorks';
import { Features } from '../../components/home/Features';
import { Testimonials } from '../../components/home/Testimonials';
import { CallToAction } from '../../components/home/CallToAction';

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <SearchBox />
      <Categories />
      <PopularVehicles />
      <HowItWorks />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};
