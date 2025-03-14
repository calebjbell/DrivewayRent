import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform, Variants } from 'framer-motion';

const Section = styled.section`
  padding: 4rem 0;
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

const StatsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const StatCard = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  color: var(--white);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const StatNumber = styled(motion.h3)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: var(--white);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: var(--font-heading);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const StatLabel = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.95);
  font-family: var(--font-primary);
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const BackgroundShapes = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

interface ShapeProps {
  size: number;
  opacity: number;
}

interface AnimatedShapeProps extends ShapeProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  y: any; // Using any for motion value type
}

const Shape = styled(motion.div)<ShapeProps>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, ${props => props.opacity});
`;

interface StatItemProps {
  number: string;
  label: string;
}

const statVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const shapeVariants: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.43, 0.13, 0.23, 0.96]
    }
  }
};

const StatItem: React.FC<StatItemProps> = ({ number, label }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      setIsVisible(value > 0);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);
  
  return (
    <StatCard ref={cardRef as React.RefObject<HTMLDivElement>}>
      <StatNumber
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={statVariants}
      >
        {number}
      </StatNumber>
      <StatLabel>{label}</StatLabel>
    </StatCard>
  );
};

const Stats: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  const shapes: AnimatedShapeProps[] = [
    { size: 100, top: '20%', left: '10%', opacity: 0.1, y: y1 },
    { size: 200, top: '60%', left: '5%', opacity: 0.05, y: y2 },
    { size: 150, top: '10%', right: '10%', opacity: 0.08, y: y2 },
    { size: 80, top: '40%', right: '20%', opacity: 0.1, y: y1 },
    { size: 120, bottom: '10%', right: '30%', opacity: 0.07, y: y2 },
    { size: 180, bottom: '20%', left: '25%', opacity: 0.05, y: y1 }
  ];
  
  return (
    <Section id="stats" ref={sectionRef as React.RefObject<HTMLElement>}>
      <Container>
        <StatsGrid
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <StatItem number="15,000+" label="Active Driveways" />
          <StatItem number="50,000+" label="Happy Drivers" />
          <StatItem number="$2.5M+" label="Host Earnings" />
          <StatItem number="30+" label="Major Cities" />
        </StatsGrid>
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
              bottom: shape.bottom,
              y: shape.y
            }}
            variants={shapeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          />
        ))}
      </BackgroundShapes>
    </Section>
  );
};

export default Stats;
