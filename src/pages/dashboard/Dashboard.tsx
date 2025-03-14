import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import DrivewayCard from './components/DrivewayCard';
import SearchFilters from './components/SearchFilters';
import Map from './components/Map';
import drivewaypic from '../../assets/drivewaypic.jpg';

const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 450px;
  height: calc(100vh - 80px);
  background: var(--bg-primary);
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`;

const ListingsSection = styled.div`
  padding: 2rem;
  overflow-y: auto;
  background: var(--bg-secondary);
  border-right: 1px solid var(--border-light);
`;

const MapSection = styled.div`
  position: sticky;
  top: 80px;
  height: calc(100vh - 80px);
  background: var(--bg-primary);
  
  @media (max-width: 1200px) {
    display: none;
  }
`;

const SearchHeader = styled(motion.div)`
  margin-bottom: 2rem;
`;

const Title = styled(motion.h1)`
  font-family: var(--font-heading);
  color: var(--text-primary);
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const DrivewaySectionTitle = styled(motion.h2)`
  font-family: var(--font-heading);
  color: var(--text-primary);
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
`;

const DrivewayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
`;

// Mock data for initial development
const mockDriveways = [
  {
    id: 1,
    title: "Historic Beacon Hill Driveway",
    location: "109 MOUNT VERNON ST BOSTON MA 02108-1220 USA",
    price: 35,
    rating: 4.9,
    reviews: 42,
    images: [drivewaypic],
    features: ["Premium Location", "Historic District", "24/7 Access"]
  },
  {
    id: 2,
    title: "Downtown Parking Space",
    location: "456 Main Street, Boston",
    price: 20,
    rating: 4.9,
    reviews: 32,
    images: [drivewaypic],
    features: ["Gated", "EV Charging", "Well-lit"]
  },
  {
    id: 3,
    title: "Cozy Home Parking",
    location: "789 Pine Avenue, Cambridge",
    price: 12,
    rating: 4.7,
    reviews: 18,
    images: [drivewaypic],
    features: ["Wide Space", "Easy Access", "Residential Area"]
  },
  {
    id: 4,
    title: "Secure Garage Spot",
    location: "321 Maple Drive, Somerville",
    price: 25,
    rating: 5.0,
    reviews: 41,
    images: [drivewaypic],
    features: ["Indoor", "Security Guard", "24/7 Access"]
  },
  {
    id: 5,
    title: "University Area Parking",
    location: "555 College Road, Cambridge",
    price: 18,
    rating: 4.6,
    reviews: 29,
    images: [drivewaypic],
    features: ["Student Friendly", "Well-lit", "Near Transit"]
  },
  {
    id: 6,
    title: "Shopping District Space",
    location: "777 Market Street, Boston",
    price: 22,
    rating: 4.8,
    reviews: 56,
    images: [drivewaypic],
    features: ["Premium Location", "Security Camera", "EV Charging"]
  },
  {
    id: 7,
    title: "Peaceful Residential Spot",
    location: "888 Willow Lane, Brookline",
    price: 14,
    rating: 4.7,
    reviews: 15,
    images: [drivewaypic],
    features: ["Quiet Area", "Easy Access", "Long-term Available"]
  },
  {
    id: 8,
    title: "Theater District Parking",
    location: "999 Broadway, Boston",
    price: 28,
    rating: 4.9,
    reviews: 47,
    images: [drivewaypic],
    features: ["Premium Location", "Valet Service", "24/7 Security"]
  },
  {
    id: 9,
    title: "Waterfront Driveway",
    location: "111 Harbor View, Boston",
    price: 30,
    rating: 5.0,
    reviews: 38,
    images: [drivewaypic],
    features: ["Ocean View", "Gated", "Premium Location"]
  },
  {
    id: 10,
    title: "Historic District Space",
    location: "222 Heritage Road, Salem",
    price: 16,
    rating: 4.8,
    reviews: 27,
    images: [drivewaypic],
    features: ["Charming Area", "Tourist Friendly", "Well-lit"]
  },
  {
    id: 11,
    title: "Tech Hub Parking",
    location: "333 Innovation Drive, Cambridge",
    price: 24,
    rating: 4.9,
    reviews: 44,
    images: [drivewaypic],
    features: ["EV Charging", "Tech-enabled Access", "Covered"]
  },
  {
    id: 12,
    title: "Sports Arena Spot",
    location: "444 Stadium Way, Boston",
    price: 35,
    rating: 4.7,
    reviews: 62,
    images: [drivewaypic],
    features: ["Event Parking", "Security Guard", "Wide Space"]
  }
];

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDrivewayId, setSelectedDrivewayId] = useState<number | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<{
    priceRange: [number, number];
    features: string[];
    availability: string;
  }>({
    priceRange: [0, 50],
    features: [],
    availability: "anytime"
  });

  const handleDrivewayClick = (id: number) => {
    setSelectedDrivewayId(id);
  };

  return (
    <DashboardLayout>
      <ListingsSection>
        <SearchHeader
          initial="hidden"
          animate="visible"
        >
          <Title
            initial="hidden"
            animate="visible"
          >
            Find Your Perfect Parking Space
          </Title>
          <SearchFilters 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={selectedFilters}
            onFiltersChange={setSelectedFilters}
          />
        </SearchHeader>

        <DrivewaySectionTitle
          initial="hidden"
          animate="visible"
        >
          Available Driveways in Your Area
        </DrivewaySectionTitle>

        <AnimatePresence>
          <DrivewayGrid>
            {mockDriveways.map((driveway, index) => (
              <motion.div
                key={driveway.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
              >
                <DrivewayCard 
                  driveway={driveway} 
                  onClick={() => handleDrivewayClick(driveway.id)}
                  isSelected={selectedDrivewayId === driveway.id}
                />
              </motion.div>
            ))}
          </DrivewayGrid>
        </AnimatePresence>
      </ListingsSection>

      <MapSection>
        <Map 
          driveways={mockDriveways} 
          selectedDrivewayId={selectedDrivewayId}
          onMarkerClick={setSelectedDrivewayId}
        />
      </MapSection>
    </DashboardLayout>
  );
};

export default Dashboard;
