import { motion, Variants } from 'framer-motion';
import styled from 'styled-components';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const HeroSection = styled.section`
  position: relative;
  min-height: 90vh;
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--bg-primary);
  padding: 8rem 0 6rem;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 65%;
    height: 100%;
    background: linear-gradient(135deg, var(--gray-100) 0%, var(--gray-200) 100%);
    clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%);
    z-index: 0;
  }
`;

const HeroContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  position: relative;
  z-index: 1;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
  }
`;

const HeroContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  line-height: 1.2;
  color: var(--gray-900);
  font-family: var(--font-heading);
  letter-spacing: -0.02em;
  
  span {
    color: var(--primary);
  }
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--gray-700);
  max-width: 540px;
  margin: 0 auto;
  font-family: var(--font-primary);
  line-height: 1.7;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  
  @media (max-width: 992px) {
    justify-content: center;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PrimaryButton = styled.button`
  padding: 1rem 2rem;
  background: var(--primary);
  color: var(--white);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  transition: var(--transition-all);
  border: 2px solid var(--primary);
  
  &:hover {
    background: var(--primary-dark);
    border-color: var(--primary-dark);
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled.button`
  padding: 1rem 2rem;
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: var(--border-radius-md);
  font-weight: 600;
  transition: var(--transition-all);
  
  &:hover {
    background: var(--primary-light);
    color: var(--primary-dark);
    transform: translateY(-2px);
  }
`;

const FloatingCard = styled(motion.div)`
  position: absolute;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--white);
  padding: 1rem 1.5rem;
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  z-index: 2;
  
  .icon {
    width: 2.5rem;
    height: 2.5rem;
    background: var(--primary-light);
    border-radius: var(--border-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
  }
  
  .text {
    h4 {
      font-size: 1rem;
      color: var(--gray-900);
      margin-bottom: 0.25rem;
      font-family: var(--font-heading);
    }
    
    p {
      font-size: 0.875rem;
      color: var(--gray-600);
      margin: 0;
    }
  }
`;

const HeroImageWrapper = styled(motion.div)`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 992px) {
    margin-top: 2rem;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const HeroImage = styled.div`
  position: relative;
  width: 100%;
  height: 450px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  background-color: #f0f2f5;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(15, 82, 186, 0.1) 0%, rgba(59, 68, 75, 0.1) 100%);
  }
`;

const ShapeDivider = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
  
  svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 120px;
  }
  
  .shape-fill {
    fill: var(--white);
  }
`;

interface FloatingCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  style: React.CSSProperties;
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  transition: Record<string, unknown>;
}

const FloatingCardComponent: React.FC<FloatingCardProps> = ({
  icon,
  title,
  description,
  style,
  initial,
  animate,
  transition
}) => (
  <FloatingCard
    initial={initial}
    animate={animate}
    transition={transition}
    style={style}
  >
    <div className="icon">{icon}</div>
    <div className="text">
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </FloatingCard>
);

const Hero: React.FC = () => {
  const [elementRef, isVisible] = useScrollAnimation<HTMLElement>();

  const fadeInUpVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const fadeInRightVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  return (
    <HeroSection ref={elementRef} id="hero">
      <HeroContainer>
        <HeroContent>
          <motion.div
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={fadeInUpVariants}
          >
            <HeroTitle>
              Share Your <span>Driveway</span>,<br />
              Share the Comfort of Home
            </HeroTitle>
            <HeroSubtitle>
              Transform your unused driveway into a welcoming space for neighbors, creating a community of shared convenience and trust.
            </HeroSubtitle>
            <HeroButtons>
              <PrimaryButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Start Sharing
              </PrimaryButton>
              <SecondaryButton as={motion.button} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                Learn More
              </SecondaryButton>
            </HeroButtons>
          </motion.div>
        </HeroContent>
        
        <HeroImageWrapper
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          variants={fadeInRightVariants}
        >
          <HeroImage>
            <img src="/src/assets/drivewaypic.jpg" alt="Charming driveway with vintage cars" />
          </HeroImage>
          
          <FloatingCardComponent
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 12h20"/>
              </svg>
            }
            title="Trusted Community"
            description="Join our neighborhood network"
            initial={{ opacity: 0, y: -20, x: 20 }}
            animate={isVisible ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: -20, x: 20 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            style={{ top: "15%", right: "10%" }}
          />
          
          <FloatingCardComponent
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
                <path d="M4 6v12c0 1.1.9 2 2 2h14v-4h-4"/>
                <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>
              </svg>
            }
            title="Simple Earnings"
            description="Make the most of your space"
            initial={{ opacity: 0, y: 20, x: -20 }}
            animate={isVisible ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 20, x: -20 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{ bottom: "15%", left: "10%" }}
          />
        </HeroImageWrapper>
      </HeroContainer>
      
      <ShapeDivider>
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </ShapeDivider>
    </HeroSection>
  );
};

export default Hero;
