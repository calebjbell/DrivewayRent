import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 5rem 0;
  background-color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  color: var(--dark);
  margin-bottom: 1rem;
  
  span {
    color: var(--primary);
  }
`;

const SectionSubtitle = styled(motion.p)`
  color: var(--text-light);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const BenefitItem = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }
`;

const IconContainer = styled(motion.div)`
  width: 70px;
  height: 70px;
  min-width: 70px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.2);
`;

const BenefitContent = styled.div``;

const BenefitTitle = styled.h3`
  margin-bottom: 0.8rem;
  color: var(--dark);
  font-size: 1.3rem;
`;

const BenefitDescription = styled.p`
  color: var(--text-light);
  line-height: 1.6;
`;

// Custom icons
const MoneyIcon = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  
  &::before {
    content: '$';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 24px;
    font-weight: bold;
  }
`;

const LocationIcon = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 12px;
    background-color: white;
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    width: 2px;
    height: 20px;
    background-color: white;
  }
`;

const ClockIcon = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  border: 2px solid white;
  border-radius: 50%;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 2px;
    background-color: white;
    transform-origin: 0 0;
    transform: rotate(45deg);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 6px;
    height: 2px;
    background-color: white;
    transform-origin: 0 0;
    transform: rotate(-45deg);
  }
`;

const ShieldIcon = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 25px;
    background-color: white;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
  
  &::after {
    content: '✓';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -40%);
    color: var(--primary);
    font-weight: bold;
    font-size: 14px;
  }
`;

const Benefits = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <Section id="benefits">
      <Container>
        <SectionHeader
          as={motion.div}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={itemVariants}>
            Why Choose <span>DrivewayRent</span>
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Our platform offers benefits for both driveway owners and drivers
          </SectionSubtitle>
        </SectionHeader>
        
        <BenefitsGrid
          as={motion.div}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <BenefitItem variants={itemVariants}>
            <IconContainer 
              variants={iconVariants}
              whileHover="hover"
            >
              <MoneyIcon />
            </IconContainer>
            <BenefitContent>
              <BenefitTitle>Earn Passive Income</BenefitTitle>
              <BenefitDescription>
                Turn your unused driveway into a revenue stream. Hosts earn an average of $250-$500 per month depending on location and availability.
              </BenefitDescription>
            </BenefitContent>
          </BenefitItem>
          
          <BenefitItem variants={itemVariants}>
            <IconContainer 
              variants={iconVariants}
              whileHover="hover"
            >
              <LocationIcon />
            </IconContainer>
            <BenefitContent>
              <BenefitTitle>Prime Parking Locations</BenefitTitle>
              <BenefitDescription>
                Find convenient parking spots in busy areas, near event venues, or in crowded neighborhoods where parking is typically scarce and expensive.
              </BenefitDescription>
            </BenefitContent>
          </BenefitItem>
          
          <BenefitItem variants={itemVariants}>
            <IconContainer 
              variants={iconVariants}
              whileHover="hover"
            >
              <ClockIcon />
            </IconContainer>
            <BenefitContent>
              <BenefitTitle>Flexible Scheduling</BenefitTitle>
              <BenefitDescription>
                Set your own availability as a host. Rent your driveway hourly, daily, or monthly. Drivers can book in advance or find last-minute spots.
              </BenefitDescription>
            </BenefitContent>
          </BenefitItem>
          
          <BenefitItem variants={itemVariants}>
            <IconContainer 
              variants={iconVariants}
              whileHover="hover"
            >
              <ShieldIcon />
            </IconContainer>
            <BenefitContent>
              <BenefitTitle>Secure & Trusted Platform</BenefitTitle>
              <BenefitDescription>
                Our verification process, secure payment system, and review system ensure a safe and reliable experience for both hosts and drivers.
              </BenefitDescription>
            </BenefitContent>
          </BenefitItem>
        </BenefitsGrid>
      </Container>
    </Section>
  );
};

export default Benefits;
