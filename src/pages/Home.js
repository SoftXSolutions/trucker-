import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import WhoWeAre from '../components/WhoWeAre';
import HowItWorks from '../components/HowItWorks';
import Services from '../components/Services';
import TopMovers from '../components/TopMovers';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [location.hash]);

  return (
    <div>
      <Hero />
      <TopMovers />
       <Services />
        <HowItWorks />
      <FAQ />
      <WhoWeAre />
     
     
      
      <CTA />
    </div>
  );
};

export default Home;
