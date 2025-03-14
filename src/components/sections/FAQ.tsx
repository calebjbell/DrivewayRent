import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

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

const FAQContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled(motion.div)`
  margin-bottom: 1rem;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  background-color: white;
`;

const FAQQuestion = styled(motion.div)`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: rgba(52, 152, 219, 0.05);
  }
`;

const QuestionText = styled.h3`
  color: var(--dark);
  font-size: 1.2rem;
  font-weight: 600;
  
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const ToggleIcon = styled(motion.div)`
  width: 20px;
  height: 20px;
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: var(--primary);
    border-radius: 2px;
  }
  
  &::before {
    width: 100%;
    height: 2px;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
  }
  
  &::after {
    width: 2px;
    height: 100%;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    transition: transform 0.3s ease;
  }
`;

const FAQAnswer = styled(motion.div)`
  padding: 0 1.5rem;
  overflow: hidden;
`;

const AnswerText = styled.p`
  color: var(--text-light);
  line-height: 1.6;
  padding-bottom: 1.5rem;
`;

const FAQCategories = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const CategoryButton = styled(motion.button)<{ isActive: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  border: none;
  background-color: ${props => props.isActive ? 'var(--primary)' : 'rgba(52, 152, 219, 0.1)'};
  color: ${props => props.isActive ? 'white' : 'var(--primary)'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.isActive ? 'var(--primary)' : 'rgba(52, 152, 219, 0.2)'};
  }
`;

interface FAQItemType {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FAQItemType[] = [
  {
    question: "How do I list my driveway on DrivewayRent?",
    answer: "Listing your driveway is simple! Create an account, click on 'List Your Driveway,' and follow the step-by-step process. You'll need to add photos, set your availability, and establish your rates. The entire process takes less than 5 minutes.",
    category: "hosts"
  },
  {
    question: "How much money can I make renting my driveway?",
    answer: "Earnings vary based on your location, the demand in your area, and your pricing strategy. Hosts in high-demand areas like city centers, near stadiums, or event venues can earn $250-$500 per month. Even in residential areas, hosts typically earn $100-$200 monthly.",
    category: "hosts"
  },
  {
    question: "Is it legal to rent out my driveway?",
    answer: "In most areas, renting your private driveway is perfectly legal. However, local regulations can vary, so we recommend checking your local zoning laws and HOA rules if applicable. DrivewayRent provides general guidance on regulations in major cities.",
    category: "hosts"
  },
  {
    question: "How do I get paid for renting my driveway?",
    answer: "Payments are processed securely through our platform. When someone books your driveway, the payment is held until 24 hours after their parking session ends. Funds are then released to your account and can be withdrawn to your bank account or PayPal.",
    category: "hosts"
  },
  {
    question: "How do I find and book a parking spot?",
    answer: "Simply enter your destination address and the date/time you need parking. Our app will show you available driveways near your destination. You can filter by price, distance, and amenities, then book and pay directly through the platform.",
    category: "drivers"
  },
  {
    question: "What if I need to cancel my parking reservation?",
    answer: "Our cancellation policy varies depending on the host's preferences. Most listings offer full refunds if canceled 24 hours before the reservation. Some hosts may have stricter policies for high-demand times. The specific cancellation policy is always clearly displayed before you book.",
    category: "drivers"
  },
  {
    question: "Is it safe to park in someone's driveway?",
    answer: "Safety is our priority. All hosts are verified, and we have a review system to ensure quality. Additionally, our secure messaging system lets you communicate with the host before arrival. Our 24/7 customer support team is always available if you encounter any issues.",
    category: "drivers"
  },
  {
    question: "What happens if my car is damaged while parked?",
    answer: "While incidents are extremely rare, DrivewayRent offers a protection plan that covers eligible damages that occur during your reservation. Be sure to document your car's condition before and after parking and report any issues immediately through the app.",
    category: "drivers"
  },
  {
    question: "How does DrivewayRent make money?",
    answer: "DrivewayRent charges a small service fee on each transaction. We charge drivers a 10% booking fee and hosts a 5% service fee. These fees help us maintain the platform, provide customer support, and develop new features to improve your experience.",
    category: "general"
  },
  {
    question: "Is DrivewayRent available in my area?",
    answer: "DrivewayRent is rapidly expanding across North America. We're currently available in most major cities and many suburban areas. Enter your location in the app to see if we're operating in your area. If not, join our waitlist to be notified when we launch near you!",
    category: "general"
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  
  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const filteredFAQs = activeCategory === "all" 
    ? faqItems 
    : faqItems.filter(item => item.category === activeCategory);
  
  const categories = [
    { id: "all", label: "All Questions" },
    { id: "hosts", label: "For Hosts" },
    { id: "drivers", label: "For Drivers" },
    { id: "general", label: "General" }
  ];
  
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
  
  const faqVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: i * 0.1
      }
    })
  };
  
  return (
    <Section id="faq">
      <Container>
        <SectionHeader
          as={motion.div}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SectionTitle variants={itemVariants}>
            Frequently Asked <span>Questions</span>
          </SectionTitle>
          <SectionSubtitle variants={itemVariants}>
            Find answers to common questions about DrivewayRent
          </SectionSubtitle>
        </SectionHeader>
        
        <FAQCategories
          as={motion.div}
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {categories.map((category, index) => (
            <CategoryButton
              key={category.id}
              isActive={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.label}
            </CategoryButton>
          ))}
        </FAQCategories>
        
        <FAQContainer>
          <AnimatePresence>
            {filteredFAQs.map((faq, index) => (
              <FAQItem
                key={`${activeCategory}-${index}`}
                custom={index}
                variants={faqVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <FAQQuestion onClick={() => toggleFAQ(index)}>
                  <QuestionText>{faq.question}</QuestionText>
                  <ToggleIcon
                    animate={{ 
                      rotate: openIndex === index ? 45 : 0 
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </FAQQuestion>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <FAQAnswer
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.3
                          },
                          opacity: {
                            duration: 0.3,
                            delay: 0.1
                          }
                        }
                      }}
                      exit={{ 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.3
                          },
                          opacity: {
                            duration: 0.2
                          }
                        }
                      }}
                    >
                      <AnswerText>{faq.answer}</AnswerText>
                    </FAQAnswer>
                  )}
                </AnimatePresence>
              </FAQItem>
            ))}
          </AnimatePresence>
        </FAQContainer>
      </Container>
    </Section>
  );
};

export default FAQ;
