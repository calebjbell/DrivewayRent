import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 5rem 0;
  background-color: var(--light);
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

const StepsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin: 0 auto;
  }
`;

const StepCard = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
`;

const StepNumber = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const StepIcon = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: rgba(52, 152, 219, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: var(--primary);
  font-size: 2rem;
`;

const StepTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--dark);
`;

const StepDescription = styled.p`
  color: var(--text-light);
  line-height: 1.6;
`;

// Custom icons using SVG-like divs
const ListIcon = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 5px;
    width: 30px;
    height: 4px;
    background-color: currentColor;
    border-radius: 2px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 20px;
    left: 5px;
    width: 30px;
    height: 4px;
    background-color: currentColor;
    border-radius: 2px;
  }
  
  span {
    position: absolute;
    top: 30px;
    left: 5px;
    width: 30px;
    height: 4px;
    background-color: currentColor;
    border-radius: 2px;
  }
`;

const CarIcon = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  
  &::before {
    content: '';
    position: absolute;
    top: 15px;
    left: 0;
    width: 40px;
    height: 12px;
    background-color: currentColor;
    border-radius: 3px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 5px;
    left: 10px;
    width: 20px;
    height: 10px;
    background-color: currentColor;
    border-radius: 3px 3px 0 0;
  }
  
  span {
    &::before {
      content: '';
      position: absolute;
      bottom: 5px;
      left: 5px;
      width: 8px;
      height: 8px;
      background-color: currentColor;
      border-radius: 50%;
    }
    
    &::after {
      content: '';
      position: absolute;
      bottom: 5px;
      right: 5px;
      width: 8px;
      height: 8px;
      background-color: currentColor;
      border-radius: 50%;
    }
  }
`;

const MoneyIcon = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  
  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    width: 20px;
    height: 20px;
    background-color: currentColor;
    border-radius: 50%;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 17px;
    left: 20px;
    width: 2px;
    height: 15px;
    background-color: var(--light);
    border-radius: 1px;
  }
`;

const HowItWorks = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
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
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        delay: 0.2
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <Section id="how-it-works">
      <Container>
        <SectionHeader
          as={motion.div}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={itemVariants}>
            How <span>DrivewayRent</span> Works
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Our simple three-step process makes it easy to start earning or find convenient parking
          </SectionSubtitle>
        </SectionHeader>
        
        <StepsContainer
          as={motion.div}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          <StepCard variants={itemVariants}>
            <StepNumber>1</StepNumber>
            <StepIcon 
              variants={iconVariants}
              whileHover="hover"
            >
              <ListIcon>
                <span></span>
              </ListIcon>
            </StepIcon>
            <StepTitle>List Your Driveway</StepTitle>
            <StepDescription>
              Create a profile, add photos of your driveway, set your availability, and establish your hourly, daily, or monthly rates. It takes less than 5 minutes to get started.
            </StepDescription>
          </StepCard>
          
          <StepCard variants={itemVariants}>
            <StepNumber>2</StepNumber>
            <StepIcon 
              variants={iconVariants}
              whileHover="hover"
            >
              <CarIcon>
                <span></span>
              </CarIcon>
            </StepIcon>
            <StepTitle>Connect with Drivers</StepTitle>
            <StepDescription>
              Drivers in your area will discover your listing and book your driveway. You'll receive notifications and can approve bookings with a single tap.
            </StepDescription>
          </StepCard>
          
          <StepCard variants={itemVariants}>
            <StepNumber>3</StepNumber>
            <StepIcon 
              variants={iconVariants}
              whileHover="hover"
            >
              <MoneyIcon />
            </StepIcon>
            <StepTitle>Get Paid Securely</StepTitle>
            <StepDescription>
              Earn money every time someone parks in your driveway. Payments are processed securely and deposited directly to your bank account. It's that simple!
            </StepDescription>
          </StepCard>
        </StepsContainer>
      </Container>
    </Section>
  );
};

export default HowItWorks;
