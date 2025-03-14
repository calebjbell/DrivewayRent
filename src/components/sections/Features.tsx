import { useRef } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';
import useScrollAnimation from '../../hooks/useScrollAnimation';
import { fadeInUp, staggerChildren } from '../../utils/animations';

const Section = styled.section`
  padding: 6rem 0;
  background-color: var(--light);
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 5rem;
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

const FeaturesContainer = styled.div`
  position: relative;
`;

const FeaturesList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FeatureItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const FeatureIconWrapper = styled(motion.div)`
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 10px 20px rgba(52, 152, 219, 0.2);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    z-index: -1;
    opacity: 0.5;
    border-radius: 30px;
    transform: scale(0.8);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scale(1.1);
  }
`;

const FeatureIcon = styled.div`
  color: white;
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const FeatureTitle = styled.h3`
  color: var(--dark);
  margin-bottom: 1rem;
  font-size: 1.4rem;
`;

const FeatureDescription = styled.p`
  color: var(--text-light);
  line-height: 1.6;
`;

const AnimatedBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
`;

const BackgroundCircle = styled(motion.div)<{ size: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: ${props => props.color};
  opacity: 0.1;
`;

// Custom icons
const MapIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
  </svg>
);

const CalendarIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20ZM7 11H12V16H7V11Z" fill="currentColor"/>
  </svg>
);

const PaymentIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="currentColor"/>
  </svg>
);

const NotificationIcon = () => (
  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="currentColor"/>
  </svg>
);

const Features = () => {
  const [ref, isVisible] = useScrollAnimation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  
  const features = [
    {
      icon: <MapIcon />,
      title: "Smart Location Matching",
      description: "Our intelligent algorithm matches drivers with the perfect parking spots based on their destination, ensuring they always find convenient parking."
    },
    {
      icon: <CalendarIcon />,
      title: "Flexible Scheduling",
      description: "Set your availability as a host or book in advance as a driver. Our calendar system makes it easy to manage your schedule and maximize earnings."
    },
    {
      icon: <PaymentIcon />,
      title: "Secure Payments",
      description: "Our payment system handles all transactions securely, with instant payouts for hosts and transparent pricing for drivers."
    },
    {
      icon: <NotificationIcon />,
      title: "Real-time Notifications",
      description: "Get instant alerts for new bookings, upcoming reservations, and payments. Stay connected and never miss an opportunity."
    }
  ];
  
  const backgroundCircles = [
    { size: 300, top: '10%', left: '-5%', color: '#3498db' },
    { size: 200, top: '60%', right: '-5%', color: '#2ecc71' },
    { size: 150, bottom: '10%', left: '20%', color: '#f39c12' },
  ];
  
  return (
    <Section id="features" ref={containerRef}>
      <Container>
        <SectionHeader
          as={motion.div}
          variants={staggerChildren}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={fadeInUp}>
            Powerful <span>Features</span>
          </SectionTitle>
          <SectionSubtitle variants={fadeInUp}>
            DrivewayRent comes packed with features to make parking easier for everyone
          </SectionSubtitle>
        </SectionHeader>
        
        <FeaturesContainer ref={ref}>
          <FeaturesList
            variants={staggerChildren}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
          >
            {features.map((feature, index) => (
              <FeatureItem
                key={index}
                variants={fadeInUp}
                custom={index * 0.1}
              >
                <FeatureIconWrapper
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <FeatureIcon>{feature.icon}</FeatureIcon>
                </FeatureIconWrapper>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureItem>
            ))}
          </FeaturesList>
          
          <AnimatedBackground>
            {backgroundCircles.map((circle, index) => (
              <BackgroundCircle
                key={index}
                size={circle.size}
                color={circle.color}
                style={{
                  top: circle.top,
                  left: circle.left,
                  right: circle.right,
                  bottom: circle.bottom,
                  y
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                viewport={{ once: true }}
              />
            ))}
          </AnimatedBackground>
        </FeaturesContainer>
      </Container>
    </Section>
  );
};

export default Features;
