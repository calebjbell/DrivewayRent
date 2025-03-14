import { useState, useCallback, useRef, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { fadeIn, loadingSpinner } from '../../../styles/animations';

interface Driveway {
  id: number;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  features: string[];
  coordinates?: google.maps.LatLngLiteral;
}

interface MapProps {
  driveways: Driveway[];
  selectedDrivewayId?: number | null;
  onMarkerClick?: (id: number) => void;
}

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const InfoCard = styled(motion.div)`
  background: var(--white);
  border-radius: var(--border-radius-lg);
  padding: 1rem;
  box-shadow: var(--shadow-lg);
  max-width: 250px;
`;

const InfoTitle = styled.h3`
  font-family: var(--font-heading);
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 0.5rem;
`;

const InfoLocation = styled.p`
  color: var(--text-secondary);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
`;

const InfoPrice = styled.div`
  font-family: var(--font-heading);
  color: var(--primary);
  font-size: 1.25rem;
  font-weight: 600;
  
  span {
    font-size: 0.875rem;
    color: var(--text-light);
    font-weight: normal;
  }
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  background: var(--bg-primary);
`;

const LoadingSpinner = styled(motion.div)`
  width: 40px;
  height: 40px;
  border: 3px solid var(--border-light);
  border-top-color: var(--primary);
  border-radius: 50%;
`;

const LoadingText = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1rem;
`;

const ErrorContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 1rem;
  padding: 2rem;
  text-align: center;
  background: var(--bg-primary);
`;

const ErrorIcon = styled(motion.div)`
  color: var(--primary);
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorText = styled(motion.p)`
  color: var(--text-secondary);
  font-size: 1rem;
  max-width: 300px;
  line-height: 1.6;
`;

const RetryButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background: var(--primary);
  color: white;
  border: none;
  border-radius: var(--border-radius-full);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-all);
  
  &:hover {
    background: var(--primary-dark);
    transform: translateY(-2px);
  }
`;

const Map = ({ driveways, selectedDrivewayId, onMarkerClick }: MapProps) => {
  const [selectedDriveway, setSelectedDriveway] = useState<Driveway | null>(null);
  const [geocodedDriveways, setGeocodedDriveways] = useState<Driveway[]>([]);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const [mapZoom, setMapZoom] = useState(12);
  const mapRef = useRef<google.maps.Map | null>(null);

  // Calculate marker size based on zoom level
  const getMarkerSize = (isSelected: boolean) => {
    // Base sizes for markers
    const baseSize = 24; 
    const selectedMultiplier = isSelected ? 1.3 : 1;
    
    // Adjust size based on zoom level
    let zoomMultiplier = 1;
    if (mapZoom <= 10) zoomMultiplier = 1.5; 
    else if (mapZoom <= 12) zoomMultiplier = 1.3;
    else if (mapZoom <= 14) zoomMultiplier = 1.1;
    
    const size = Math.round(baseSize * zoomMultiplier * selectedMultiplier);
    return new window.google.maps.Size(size, size);
  };

  // Create brown pin SVG icon
  const createPinIcon = (isSelected: boolean) => {
    const color = isSelected ? '#5D2E0C' : '#8B4513'; 
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="24" height="34" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 0C8.95431 0 0 8.95431 0 20C0 31.0457 20 56 20 56C20 56 40 31.0457 40 20C40 8.95431 31.0457 0 20 0Z" fill="${color}"/>
        <circle cx="20" cy="20" r="8" fill="white"/>
      </svg>
    `)}`;
  };

  // Handle map load and add zoom change listener
  const onLoad = useCallback((map: google.maps.Map) => {
    console.log('Map loaded');
    mapRef.current = map;
    
    // Add zoom change listener
    map.addListener('zoom_changed', () => {
      const newZoom = map.getZoom() || 12;
      setMapZoom(newZoom);
    });
  }, []);

  // Update selected driveway when selectedDrivewayId changes
  useEffect(() => {
    if (selectedDrivewayId) {
      const driveway = geocodedDriveways.find(d => d.id === selectedDrivewayId);
      if (driveway && driveway.coordinates) {
        setSelectedDriveway(driveway);
        mapRef.current?.panTo(driveway.coordinates);
        mapRef.current?.setZoom(16);
      }
    } else {
      setSelectedDriveway(null);
    }
  }, [selectedDrivewayId, geocodedDriveways]);

  console.log('Map component rendering with driveways:', driveways);
  console.log('API Key:', import.meta.env.VITE_GOOGLE_MAPS_API_KEY);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries: ["places"]
  });

  useEffect(() => {
    if (!isLoaded || !driveways.length) return;

    const geocodeAddresses = async () => {
      try {
        console.log('Starting geocoding process...');
        const geocoder = new window.google.maps.Geocoder();
        
        const results = await Promise.all(
          driveways.map(async (driveway) => {
            try {
              console.log(`Geocoding address: ${driveway.location}`);
              return new Promise<Driveway>((resolve) => {
                geocoder.geocode(
                  { address: `${driveway.location}, Massachusetts, USA` },
                  (results, status) => {
                    if (status === 'OK' && results && results[0]) {
                      const location = results[0].geometry.location;
                      console.log(`Successfully geocoded ${driveway.location}:`, {
                        lat: location.lat(),
                        lng: location.lng()
                      });
                      resolve({
                        ...driveway,
                        coordinates: {
                          lat: location.lat(),
                          lng: location.lng()
                        }
                      });
                    } else {
                      console.warn(`Geocoding failed for ${driveway.location}:`, status);
                      resolve(driveway);
                    }
                  }
                );
              });
            } catch (error) {
              console.error(`Error geocoding ${driveway.location}:`, error);
              return driveway;
            }
          })
        );

        console.log('Geocoding completed. Results:', results);
        const validResults = results.filter(d => d.coordinates);
        console.log('Valid geocoded locations:', validResults.length);
        
        setGeocodedDriveways(results);

        if (mapRef.current && validResults.length > 0) {
          const bounds = new window.google.maps.LatLngBounds();
          validResults.forEach(driveway => {
            if (driveway.coordinates) {
              bounds.extend(driveway.coordinates);
            }
          });
          mapRef.current.fitBounds(bounds);

          setTimeout(() => {
            if (mapRef.current) {
              const zoom = mapRef.current.getZoom();
              if (zoom && zoom > 15) mapRef.current.setZoom(15);
              if (zoom && zoom < 10) mapRef.current.setZoom(10);
            }
          }, 100);
        }
      } catch (error) {
        console.error('Geocoding error:', error);
        setGeocodingError('Failed to load locations. Please try again.');
      }
    };

    geocodeAddresses();
  }, [isLoaded, driveways]);

  const mapStyles = {
    height: "100%",
    width: "100%"
  };

  const defaultCenter = {
    lat: 42.3601,
    lng: -71.0589
  };

  const onUnmount = useCallback(() => {
    console.log('Map unmounted');
    mapRef.current = null;
  }, []);

  if (loadError || geocodingError) {
    console.error('Map error:', loadError || geocodingError);
    return (
      <MapContainer>
        <ErrorContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ErrorIcon
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            ⚠️
          </ErrorIcon>
          <ErrorText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {geocodingError || 'Error loading map. Please check your internet connection and try again.'}
          </ErrorText>
          <RetryButton
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -2 }}
            onClick={() => window.location.reload()}
          >
            Try Again
          </RetryButton>
        </ErrorContainer>
      </MapContainer>
    );
  }

  if (!isLoaded || !geocodedDriveways.length) {
    return (
      <MapContainer>
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <LoadingSpinner
            animate="animate"
            variants={loadingSpinner}
          />
          <LoadingText
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {!isLoaded ? 'Loading map...' : 'Loading driveway locations...'}
          </LoadingText>
        </LoadingContainer>
      </MapContainer>
    );
  }

  return (
    <MapContainer>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={12}
        center={defaultCenter}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          styles: [
            {
              featureType: "all",
              elementType: "geometry",
              stylers: [{ color: "#f5f5f5" }]
            },
            {
              featureType: "water",
              elementType: "geometry",
              stylers: [{ color: "#c9c9c9" }]
            },
            {
              featureType: "water",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }]
            },
            {
              featureType: "road",
              elementType: "geometry",
              stylers: [{ color: "#ffffff" }]
            },
            {
              featureType: "road",
              elementType: "labels.text.fill",
              stylers: [{ color: "#9e9e9e" }]
            },
            {
              featureType: "poi",
              elementType: "geometry",
              stylers: [{ color: "#eeeeee" }]
            },
            {
              featureType: "poi.park",
              elementType: "geometry",
              stylers: [{ color: "#e5e5e5" }]
            }
          ],
          disableDefaultUI: true,
          zoomControl: true,
          scrollwheel: true,
          mapTypeControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
        }}
      >
        {geocodedDriveways.map((driveway) => (
          driveway.coordinates && (
            <Marker
              key={driveway.id}
              position={driveway.coordinates}
              onClick={() => {
                setSelectedDriveway(driveway);
                onMarkerClick?.(driveway.id);
              }}
              icon={{
                url: createPinIcon(selectedDrivewayId === driveway.id),
                scaledSize: getMarkerSize(selectedDrivewayId === driveway.id),
                anchor: new google.maps.Point(12, 34) 
              }}
            />
          )
        ))}

        {selectedDriveway && selectedDriveway.coordinates && (
          <InfoWindow
            position={selectedDriveway.coordinates}
            onCloseClick={() => {
              setSelectedDriveway(null);
              onMarkerClick?.(0); // Clear selection
            }}
          >
            <InfoCard
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={fadeIn}
            >
              <InfoTitle>{selectedDriveway.title}</InfoTitle>
              <InfoLocation>{selectedDriveway.location}</InfoLocation>
              <InfoPrice>
                ${selectedDriveway.price} <span>/ day</span>
              </InfoPrice>
            </InfoCard>
          </InfoWindow>
        )}
      </GoogleMap>
    </MapContainer>
  );
};

export default Map;
