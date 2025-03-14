import { useEffect } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { fadeInUp, staggerContainer, slideInRight, fadeIn } from '../../styles/animations';
import parkingIcon from '../../assets/parking-icon.svg';
import securityIcon from '../../assets/security-icon.svg';
import bookingIcon from '../../assets/booking-icon.svg';
import revenueIcon from '../../assets/revenue-icon.svg';

const FeaturesContainer = styled.div`
  min-height: 100vh;
  background: var(--bg-primary);
  padding: 6rem 2rem;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;
`;

const Title = styled(motion.h1)`
  font-family: var(--font-heading);
  color: var(--text-primary);
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const Subtitle = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1.25rem;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const Section = styled(motion.section)`
  margin-bottom: 8rem;
`;

const SectionTitle = styled(motion.h2)`
  font-family: var(--font-heading);
  color: var(--text-primary);
  font-size: 2.25rem;
  margin-bottom: 3rem;
  text-align: center;
`;

const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
`;

const FeatureCard = styled(motion.div)`
  background: var(--white);
  border-radius: var(--border-radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-light);
  transition: var(--transition-all);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--primary-light);
  }
`;

const IconWrapper = styled(motion.div)`
  width: 64px;
  height: 64px;
  margin-bottom: 1.5rem;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const FeatureTitle = styled(motion.h3)`
  font-family: var(--font-heading);
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
`;

const DetailedFeature = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  margin-bottom: 6rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  &:nth-child(even) {
    direction: rtl;
    
    > * {
      direction: ltr;
    }
    
    @media (max-width: 992px) {
      direction: ltr;
    }
  }
`;

const FeatureContent = styled(motion.div)`
  max-width: 500px;
`;

const FeatureImage = styled(motion.div)`
  width: 100%;
  height: 400px;
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BenefitsList = styled(motion.ul)`
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

const BenefitItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  svg {
    width: 24px;
    height: 24px;
    color: var(--primary);
    flex-shrink: 0;
    margin-top: 0.25rem;
  }
`;

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface FeatureType {
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

interface DetailedFeatureType {
  title: string;
  description: string;
  image: string;
  benefits: string[];
}

const features: FeatureType[] = [
  {
    icon: parkingIcon,
    title: "Smart Parking Solutions",
    description: "Find and reserve the perfect parking spot in your neighborhood. Our intuitive map interface makes it simple to locate available driveways.",
    benefits: [
      "Real-time availability updates",
      "Interactive map with detailed filters",
      "Secure online reservations",
      "Instant booking confirmation"
    ]
  },
  {
    icon: securityIcon,
    title: "Safety & Trust",
    description: "Every driveway is verified and reviewed. Our secure platform ensures safe transactions and reliable parking experiences.",
    benefits: [
      "Identity verification system",
      "Secure payment processing",
      "24/7 customer support",
      "Comprehensive insurance coverage"
    ]
  },
  {
    icon: bookingIcon,
    title: "Flexible Booking",
    description: "Book by the hour, day, or month. Our flexible scheduling system adapts to your parking needs with real-time availability.",
    benefits: [
      "Customizable booking durations",
      "Easy cancellation options",
      "Automated reminders",
      "Mobile-friendly booking process"
    ]
  },
  {
    icon: revenueIcon,
    title: "Passive Income",
    description: "Turn your unused driveway into a source of passive income. Set your own rates and availability to maximize earnings.",
    benefits: [
      "Competitive pricing tools",
      "Automated payments",
      "Monthly earning reports",
      "Tax documentation support"
    ]
  }
];

const detailedFeatures: DetailedFeatureType[] = [
  {
    title: "Host Dashboard",
    description: "Take control of your driveway rental business with our comprehensive host dashboard. Monitor bookings, manage availability, and track earnings all in one place.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Real-time booking management",
      "Automated payment processing",
      "Performance analytics",
      "Custom availability calendar"
    ]
  },
  {
    title: "Mobile Experience",
    description: "Access your parking spot or manage your listings on the go with our mobile-optimized platform. Perfect for both drivers and hosts.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Quick booking process",
      "Real-time notifications",
      "GPS navigation",
      "Digital parking passes"
    ]
  },
  {
    title: "Community Trust",
    description: "Join a trusted community of hosts and drivers. Our platform is built on transparency, reliability, and mutual respect.",
    image: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80",
    benefits: [
      "Verified user profiles",
      "Rating and review system",
      "Community guidelines",
      "Dispute resolution support"
    ]
  }
];

const featureVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.1
    }
  })
};

const Features = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <FeaturesContainer>
      <ContentWrapper>
        <Header
          as={motion.div}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <Title as={motion.h1} variants={fadeInUp}>
            Why Choose DrivewayRent?
          </Title>
          <Subtitle as={motion.p} variants={fadeInUp}>
            Discover how our platform revolutionizes parking by connecting drivers with available driveways in their neighborhood while helping homeowners earn extra income.
          </Subtitle>
        </Header>

        <Section as={motion.section}>
          <SectionTitle as={motion.h2} variants={fadeInUp}>
            Core Features
          </SectionTitle>
          <FeaturesGrid
            as={motion.div}
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                as={motion.div}
                variants={featureVariants}
                custom={index}
                whileHover={{
                  y: -4,
                  transition: { duration: 0.2 }
                }}
              >
                <IconWrapper
                  as={motion.div}
                  variants={slideInRight}
                  whileHover={{ 
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <img src={feature.icon} alt={feature.title} />
                </IconWrapper>
                <FeatureTitle as={motion.h3} variants={fadeInUp}>
                  {feature.title}
                </FeatureTitle>
                <FeatureDescription as={motion.p} variants={fadeInUp}>
                  {feature.description}
                </FeatureDescription>
                <BenefitsList as={motion.ul} variants={staggerContainer}>
                  {feature.benefits.map((benefit, index) => (
                    <BenefitItem
                      key={benefit}
                      as={motion.li}
                      variants={fadeInUp}
                      custom={index}
                    >
                      <CheckIcon />
                      <span>{benefit}</span>
                    </BenefitItem>
                  ))}
                </BenefitsList>
              </FeatureCard>
            ))}
          </FeaturesGrid>
        </Section>

        <Section as={motion.section}>
          <SectionTitle as={motion.h2} variants={fadeInUp}>
            Detailed Features
          </SectionTitle>
          {detailedFeatures.map((feature) => (
            <DetailedFeature
              key={feature.title}
              as={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.43, 0.13, 0.23, 0.96]
                  }
                }
              }}
            >
              <FeatureContent as={motion.div}>
                <FeatureTitle
                  as={motion.h3}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: {
                      opacity: 1,
                      x: 0,
                      transition: {
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  {feature.title}
                </FeatureTitle>
                <FeatureDescription
                  as={motion.p}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        duration: 0.4,
                        delay: 0.2
                      }
                    }
                  }}
                >
                  {feature.description}
                </FeatureDescription>
                <BenefitsList
                  as={motion.ul}
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.3
                      }
                    }
                  }}
                >
                  {feature.benefits.map((benefit) => (
                    <BenefitItem
                      key={benefit}
                      as={motion.li}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        visible: {
                          opacity: 1,
                          x: 0,
                          transition: {
                            duration: 0.3
                          }
                        }
                      }}
                    >
                      <CheckIcon />
                      <span>{benefit}</span>
                    </BenefitItem>
                  ))}
                </BenefitsList>
              </FeatureContent>
              <FeatureImage
                as={motion.div}
                variants={{
                  hidden: { 
                    opacity: 0,
                    scale: 0.95,
                    y: 20
                  },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.43, 0.13, 0.23, 0.96]
                    }
                  }
                }}
              >
                <img src={feature.image} alt={feature.title} />
              </FeatureImage>
            </DetailedFeature>
          ))}
        </Section>
      </ContentWrapper>
    </FeaturesContainer>
  );
};

export default Features;
