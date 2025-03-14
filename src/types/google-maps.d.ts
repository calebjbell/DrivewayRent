/// <reference types="@types/google.maps" />

declare module '@react-google-maps/api' {
  export interface LoadScriptProps {
    googleMapsApiKey: string;
    libraries?: Array<'places' | 'drawing' | 'geometry' | 'visualization'>;
  }

  export interface GoogleMapProps {
    mapContainerStyle?: {
      width: string;
      height: string;
    };
    center?: google.maps.LatLngLiteral;
    zoom?: number;
    onLoad?: (map: google.maps.Map) => void;
    onUnmount?: () => void;
    options?: google.maps.MapOptions;
    children?: React.ReactNode;
  }

  export interface MarkerProps {
    position: google.maps.LatLngLiteral;
    onClick?: () => void;
    icon?: google.maps.Icon | string;
  }

  export interface InfoWindowProps {
    position: google.maps.LatLngLiteral;
    onCloseClick?: () => void;
    children?: React.ReactNode;
  }

  export const LoadScript: React.FC<LoadScriptProps>;
  export const GoogleMap: React.FC<GoogleMapProps>;
  export const Marker: React.FC<MarkerProps>;
  export const InfoWindow: React.FC<InfoWindowProps>;
  export function useLoadScript(props: LoadScriptProps): {
    isLoaded: boolean;
    loadError: Error | undefined;
  };
}
