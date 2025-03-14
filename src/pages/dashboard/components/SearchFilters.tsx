import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

interface FilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters: {
    priceRange: [number, number];
    features: string[];
    availability: string;
  };
  onFiltersChange: (filters: any) => void;
}

const FiltersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--text-light);
    width: 20px;
    height: 20px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid var(--border-medium);
  border-radius: var(--border-radius-lg);
  background: var(--white);
  font-family: var(--font-primary);
  font-size: 1rem;
  color: var(--text-primary);
  transition: var(--transition-all);
  
  &:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(139, 69, 19, 0.1);
  }
  
  &::placeholder {
    color: var(--text-light);
  }
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  padding: 0.75rem 1.25rem;
  border: 2px solid ${props => props.$active ? 'var(--primary)' : 'var(--border-medium)'};
  border-radius: var(--border-radius-full);
  background: ${props => props.$active ? 'var(--primary-light)' : 'var(--white)'};
  color: ${props => props.$active ? 'var(--primary)' : 'var(--text-secondary)'};
  font-family: var(--font-primary);
  font-weight: 500;
  font-size: 0.875rem;
  transition: var(--transition-all);
  
  &:hover {
    border-color: var(--primary);
    background: ${props => props.$active ? 'var(--primary-light)' : 'var(--bg-secondary)'};
  }
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: 0.5rem;
    vertical-align: middle;
  }
`;

const FilterPanel = styled(motion.div)`
  background: var(--white);
  border: 1px solid var(--border-medium);
  border-radius: var(--border-radius-lg);
  padding: 1.5rem;
  margin-top: 1rem;
  box-shadow: var(--shadow-lg);
`;

const FilterSection = styled.div`
  &:not(:last-child) {
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid var(--border-light);
  }
`;

const FilterTitle = styled.h3`
  font-family: var(--font-heading);
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const RangeSlider = styled.input`
  width: 100%;
  margin: 1rem 0;
  -webkit-appearance: none;
  background: var(--primary-light);
  height: 4px;
  border-radius: 2px;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    border: 2px solid var(--white);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 0.75rem;
`;

const FeatureCheckbox = styled.label`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  
  input {
    width: 16px;
    height: 16px;
    border: 2px solid var(--border-medium);
    border-radius: 4px;
    
    &:checked {
      background-color: var(--primary);
      border-color: var(--primary);
    }
  }
`;

const ApplyButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: var(--primary);
  color: var(--white);
  border: none;
  border-radius: var(--border-radius-md);
  font-family: var(--font-primary);
  font-weight: 600;
  font-size: 1rem;
  transition: var(--transition-all);
  margin-top: 1rem;
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }
`;

const features = [
  "24/7 Access",
  "Security Camera",
  "Covered",
  "Gated",
  "EV Charging",
  "Well-lit",
  "Wide Space",
  "Easy Access"
];

const SearchFilters = ({ searchQuery, onSearchChange, filters, onFiltersChange }: FilterProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [tempFilters, setTempFilters] = useState(filters);

  const handleApplyFilters = () => {
    onFiltersChange(tempFilters);
    setShowFilters(false);
  };

  return (
    <FiltersContainer>
      <SearchBar>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <SearchInput
          type="text"
          placeholder="Search by location or driveway name..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </SearchBar>

      <FiltersRow>
        <FilterButton
          $active={showFilters}
          onClick={() => setShowFilters(!showFilters)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
          </svg>
          Filters
        </FilterButton>
        
        <FilterButton $active={tempFilters.availability === "today"}>
          Today
        </FilterButton>
        
        <FilterButton $active={tempFilters.priceRange[1] < 30}>
          Under $30/day
        </FilterButton>
      </FiltersRow>

      <AnimatePresence>
        {showFilters && (
          <FilterPanel
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <FilterSection>
              <FilterTitle>Price Range</FilterTitle>
              <RangeSlider
                type="range"
                min="0"
                max="100"
                value={tempFilters.priceRange[1]}
                onChange={(e) => setTempFilters({
                  ...tempFilters,
                  priceRange: [0, parseInt(e.target.value)]
                })}
              />
              <div>Up to ${tempFilters.priceRange[1]}/day</div>
            </FilterSection>

            <FilterSection>
              <FilterTitle>Features</FilterTitle>
              <FeatureGrid>
                {features.map((feature) => (
                  <FeatureCheckbox key={feature}>
                    <input
                      type="checkbox"
                      checked={tempFilters.features.includes(feature)}
                      onChange={(e) => {
                        const newFeatures = e.target.checked
                          ? [...tempFilters.features, feature]
                          : tempFilters.features.filter(f => f !== feature);
                        setTempFilters({ ...tempFilters, features: newFeatures });
                      }}
                    />
                    {feature}
                  </FeatureCheckbox>
                ))}
              </FeatureGrid>
            </FilterSection>

            <ApplyButton onClick={handleApplyFilters}>
              Apply Filters
            </ApplyButton>
          </FilterPanel>
        )}
      </AnimatePresence>
    </FiltersContainer>
  );
};

export default SearchFilters;
