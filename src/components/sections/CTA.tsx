import styled from 'styled-components';
import { motion } from 'framer-motion';

const Section = styled.section`
  padding: 5rem 0;
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const CTAContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: white;
`;

const CTATitle = styled(motion.h2)`
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const CTASubtitle = styled(motion.p)`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2.5rem;
  opacity: 0.9;
`;

const CTAButtons = styled(motion.div)`
  display: flex;
  gap: 1.5rem;
  
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled(motion.button)`
  background-color: white;
  color: var(--primary);
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
`;

const SecondaryButton = styled(motion.button)`
  background-color: transparent;
  color: white;
  border: 2px solid white;
  padding: 1rem 2.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Shape = styled(motion.div)<{ size: number; opacity: number }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, ${props => props.opacity});
`;

const CTA = () => {
  const shapes = [
    { size: 100, top: '20%', left: '10%', opacity: 0.1, delay: 0 },
    { size: 200, top: '60%', left: '5%', opacity: 0.05, delay: 0.5 },
    { size: 150, top: '10%', right: '10%', opacity: 0.08, delay: 1 },
    { size: 80, top: '40%', right: '20%', opacity: 0.1, delay: 1.5 },
    { size: 120, bottom: '10%', right: '30%', opacity: 0.07, delay: 2 },
    { size: 180, bottom: '20%', left: '25%', opacity: 0.05, delay: 2.5 }
  ];
  
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };
  
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3
      }
    },
    hover: { 
      scale: 1.05,
      transition: { 
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.95 }
  };
  
  const shapeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (delay: number) => ({ 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 1.5,
        delay: delay,
        ease: "easeOut"
      }
    })
  };
  
  return (
    <Section id="cta">
      <Container>
        <CTAContent>
          <CTATitle
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            Ready to Transform Your Driveway Into Income?
          </CTATitle>
          <CTASubtitle
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.2 }}
          >
            Join thousands of hosts already earning passive income with their unused driveways. 
            Get started in minutes and receive your first booking as soon as today!
          </CTASubtitle>
          <CTAButtons
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.4 }}
          >
            <PrimaryButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              List Your Driveway
            </PrimaryButton>
            <SecondaryButton
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Find Parking
            </SecondaryButton>
          </CTAButtons>
        </CTAContent>
      </Container>
      
      <BackgroundShapes>
        {shapes.map((shape, index) => (
          <Shape
            key={index}
            size={shape.size}
            opacity={shape.opacity}
            style={{
              top: shape.top,
              left: shape.left,
              right: shape.right,
              bottom: shape.bottom
            }}
            variants={shapeVariants}
            custom={shape.delay}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          />
        ))}
      </BackgroundShapes>
    </Section>
  );
};

export default CTA;
