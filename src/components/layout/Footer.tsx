import styled from 'styled-components';
import { motion } from 'framer-motion';

const FooterContainer = styled.footer`
  background-color: var(--dark);
  color: var(--light);
  padding: 4rem 0 2rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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

const FooterColumn = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const FooterLogo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: white;
  
  span {
    color: var(--accent);
  }
`;

const FooterDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 1.5rem;
`;

const FooterHeading = styled.h4`
  color: white;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
`;

const FooterLinks = styled.ul`
  list-style: none;
  
  li {
    margin-bottom: 0.8rem;
    
    a {
      color: var(--text-light);
      transition: color 0.3s ease;
      
      &:hover {
        color: var(--primary);
      }
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialIcon = styled(motion.a)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: var(--primary);
  }
`;

const Copyright = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 3rem;
  color: var(--text-light);
  
  a {
    color: var(--primary);
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const socialVariants = {
    hover: { scale: 1.1, rotate: 5 }
  };
  
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <FooterLogo>
            Driveway<span>Rent</span>
          </FooterLogo>
          <FooterDescription>
            Connecting driveway owners with drivers looking for convenient parking solutions.
          </FooterDescription>
          <SocialLinks>
            <SocialIcon 
              href="#" 
              variants={socialVariants}
              whileHover="hover"
            >
              f
            </SocialIcon>
            <SocialIcon 
              href="#" 
              variants={socialVariants}
              whileHover="hover"
            >
              t
            </SocialIcon>
            <SocialIcon 
              href="#" 
              variants={socialVariants}
              whileHover="hover"
            >
              in
            </SocialIcon>
            <SocialIcon 
              href="#" 
              variants={socialVariants}
              whileHover="hover"
            >
              ig
            </SocialIcon>
          </SocialLinks>
        </FooterColumn>
        
        <FooterColumn
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.2 }}
        >
          <FooterHeading>Company</FooterHeading>
          <FooterLinks>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Press</a></li>
            <li><a href="#">Contact</a></li>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.4 }}
        >
          <FooterHeading>Resources</FooterHeading>
          <FooterLinks>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Safety Guidelines</a></li>
            <li><a href="#">Host Resources</a></li>
            <li><a href="#">Community Forum</a></li>
            <li><a href="#">Affiliate Program</a></li>
          </FooterLinks>
        </FooterColumn>
        
        <FooterColumn
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ delay: 0.6 }}
        >
          <FooterHeading>Legal</FooterHeading>
          <FooterLinks>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Accessibility</a></li>
            <li><a href="#">Sitemap</a></li>
          </FooterLinks>
        </FooterColumn>
      </FooterContent>
      
      <Copyright>
        <p>&copy; {currentYear} DrivewayRent. All rights reserved.</p>
        <p>Made with ❤️ for convenient parking solutions.</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
