import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Section = styled.section`
  padding: 5rem 0;
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

const TestimonialsWrapper = styled.div`
  position: relative;
  padding: 2rem 0;
`;

const TestimonialsTrack = styled(motion.div)`
  display: flex;
  width: 100%;
`;

const TestimonialCard = styled(motion.div)`
  background-color: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  min-width: 100%;
  max-width: 100%;
  
  @media (min-width: 768px) {
    min-width: calc(50% - 1rem);
    max-width: calc(50% - 1rem);
    margin-right: 2rem;
  }
  
  @media (min-width: 992px) {
    min-width: calc(33.333% - 1.333rem);
    max-width: calc(33.333% - 1.333rem);
    margin-right: 2rem;
  }
`;

const TestimonialContent = styled.div`
  margin-bottom: 1.5rem;
`;

const TestimonialText = styled.p`
  color: var(--text);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 1rem;
  position: relative;
  
  &::before {
    content: '"';
    position: absolute;
    top: -20px;
    left: -10px;
    font-size: 4rem;
    color: rgba(52, 152, 219, 0.1);
    font-family: Georgia, serif;
  }
`;

const TestimonialRating = styled.div`
  display: flex;
  color: var(--accent);
  margin-bottom: 1rem;
`;

const Star = styled.span`
  margin-right: 3px;
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary);
  margin-right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.2rem;
`;

const AuthorInfo = styled.div``;

const AuthorName = styled.h4`
  color: var(--dark);
  margin-bottom: 0.2rem;
`;

const AuthorType = styled.p`
  color: var(--text-light);
  font-size: 0.9rem;
`;

const NavigationButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const NavButton = styled(motion.button)`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary);
  font-size: 1.2rem;
  cursor: pointer;
  
  &:disabled {
    color: var(--text-light);
    cursor: not-allowed;
  }
`;

const ProgressIndicators = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const ProgressDot = styled(motion.div)<{ isActive: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => props.isActive ? 'var(--primary)' : 'rgba(52, 152, 219, 0.2)'};
  cursor: pointer;
`;

const testimonials = [
  {
    text: "I've been renting out my driveway near the stadium on game days and making an extra $200 each weekend. The process is so simple, and the customers have all been respectful.",
    rating: 5,
    name: "Michael T.",
    type: "Driveway Host",
    initials: "MT"
  },
  {
    text: "Finding parking downtown used to be a nightmare. Now I book a spot through DrivewayRent and save both time and money. It's usually 50% cheaper than public parking garages!",
    rating: 5,
    name: "Sarah L.",
    type: "Driver",
    initials: "SL"
  },
  {
    text: "As a property manager, I've added all our unused parking spaces to DrivewayRent. It's generating significant additional revenue for our properties with zero hassle.",
    rating: 5,
    name: "David K.",
    type: "Property Manager",
    initials: "DK"
  },
  {
    text: "I work in the city and parking was costing me a fortune. I found a monthly spot on DrivewayRent that's saving me over $100 every month and is actually closer to my office!",
    rating: 4,
    name: "Jennifer P.",
    type: "Driver",
    initials: "JP"
  },
  {
    text: "Our restaurant has limited parking, so we partnered with neighbors who list their driveways on DrivewayRent. Our customers love the convenience and it's helped our business grow.",
    rating: 5,
    name: "Robert M.",
    type: "Business Owner",
    initials: "RM"
  },
  {
    text: "I rent my driveway while I'm at work. It's literally making money while I'm making money! The app makes it so easy to manage bookings and payments.",
    rating: 5,
    name: "Lisa W.",
    type: "Driveway Host",
    initials: "LW"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      if (trackRef.current) {
        const cardWidth = trackRef.current.querySelector('div')?.offsetWidth || 0;
        setWidth(cardWidth);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const getVisibleCount = () => {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  
  const maxIndex = testimonials.length - getVisibleCount();
  
  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };
  
  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };
  
  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(index, maxIndex));
  };
  
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
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5 }
    }
  };
  
  return (
    <Section id="testimonials">
      <Container>
        <SectionHeader
          as={motion.div}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={itemVariants}>
            What Our <span>Users Say</span>
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Join thousands of satisfied driveway hosts and drivers across the country
          </SectionSubtitle>
        </SectionHeader>
        
        <TestimonialsWrapper>
          <TestimonialsTrack 
            ref={trackRef}
            as={motion.div}
            animate={{ x: -currentIndex * (width + 32) }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                as={motion.div}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialContent>
                  <TestimonialText>
                    {testimonial.text}
                  </TestimonialText>
                  <TestimonialRating>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i}>
                        {i < testimonial.rating ? "★" : "☆"}
                      </Star>
                    ))}
                  </TestimonialRating>
                </TestimonialContent>
                <TestimonialAuthor>
                  <AuthorAvatar>
                    {testimonial.initials}
                  </AuthorAvatar>
                  <AuthorInfo>
                    <AuthorName>{testimonial.name}</AuthorName>
                    <AuthorType>{testimonial.type}</AuthorType>
                  </AuthorInfo>
                </TestimonialAuthor>
              </TestimonialCard>
            ))}
          </TestimonialsTrack>
          
          <NavigationButtons>
            <NavButton
              onClick={handlePrev}
              disabled={currentIndex === 0}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              ←
            </NavButton>
            <NavButton
              onClick={handleNext}
              disabled={currentIndex >= maxIndex}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              →
            </NavButton>
          </NavigationButtons>
          
          <ProgressIndicators>
            {[...Array(maxIndex + 1)].map((_, index) => (
              <ProgressDot
                key={index}
                isActive={index === currentIndex}
                onClick={() => handleDotClick(index)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              />
            ))}
          </ProgressIndicators>
        </TestimonialsWrapper>
      </Container>
    </Section>
  );
};

export default Testimonials;
