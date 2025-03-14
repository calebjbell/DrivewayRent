import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { cardHover, fadeIn, scaleIn } from '../../../styles/animations';

interface DrivewayProps {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  features: string[];
}

interface DrivewayCardProps {
  driveway: DrivewayProps;
  onClick?: () => void;
  isSelected?: boolean;
}

const Card = styled(motion.div)<{ isSelected?: boolean }>`
  background: var(--white);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-md);
  border: 1px solid ${props => props.isSelected ? 'var(--primary)' : 'var(--border-light)'};
  transition: var(--transition-all);
  cursor: pointer;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }
`;

const ImageContainer = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0) 100%);
  }
`;

const Image = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled(motion.div)`
  padding: 1.5rem;
`;

const Title = styled(motion.h3)`
  font-family: var(--font-heading);
  color: var(--text-primary);
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  line-height: 1.4;
`;

const Location = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const PriceRow = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Price = styled(motion.div)`
  font-family: var(--font-heading);
  color: var(--primary);
  font-size: 1.5rem;
  font-weight: 600;
  
  span {
    font-size: 0.875rem;
    color: var(--text-light);
    font-weight: normal;
  }
`;

const Rating = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
  
  svg {
    color: var(--accent);
  }
`;

const Features = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-light);
`;

const Feature = styled(motion.span)`
  background: var(--bg-secondary);
  color: var(--text-secondary);
  padding: 0.25rem 0.75rem;
  border-radius: var(--border-radius-full);
  font-size: 0.75rem;
  font-weight: 500;
  transition: var(--transition-all);
  
  &:hover {
    background: var(--primary-light);
    color: var(--primary);
  }
`;

const DrivewayCard = ({ driveway, onClick, isSelected }: DrivewayCardProps) => {
  return (
    <Card
      variants={scaleIn}
      whileHover={cardHover}
      layout
      onClick={onClick}
      isSelected={isSelected}
    >
      <ImageContainer>
        <Image 
          src={driveway.images[0]} 
          alt={driveway.title}
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </ImageContainer>
      
      <Content variants={fadeIn}>
        <Title variants={fadeIn}>{driveway.title}</Title>
        <Location variants={fadeIn}>{driveway.location}</Location>
        
        <PriceRow variants={fadeIn}>
          <Price variants={fadeIn}>
            ${driveway.price} <span>/ day</span>
          </Price>
          <Rating variants={fadeIn}>
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="currentColor"
              whileHover={{ scale: 1.2 }}
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </motion.svg>
            {driveway.rating} ({driveway.reviews})
          </Rating>
        </PriceRow>
        
        <Features variants={fadeIn}>
          <AnimatePresence>
            {driveway.features.map((feature, index) => (
              <Feature
                key={index}
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                {feature}
              </Feature>
            ))}
          </AnimatePresence>
        </Features>
      </Content>
    </Card>
  );
};

export default DrivewayCard;
