import Hero from '../components/sections/Hero';
import HowItWorks from '../components/sections/HowItWorks';
import Benefits from '../components/sections/Benefits';
import Features from '../components/sections/Features';
import Stats from '../components/sections/Stats';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import CTA from '../components/sections/CTA';

const Home = () => {
  return (
    <>
      <Hero />
      <HowItWorks />
      <Benefits />
      <Features />
      <Stats />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
};

export default Home;
