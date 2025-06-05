import React from "react";
import { View, Text } from "react-native"; // Keep for loading/error states
import {
  GoogleMap,
  Marker as GoogleMarker,
  useJsApiLoader,
} from "@react-google-maps/api";

interface PlatformMapProps {
  initialRegion: {
    latitude: number;
    longitude: number;
    latitudeDelta: number; // Not directly used by GoogleMap, but part of the shared prop type
    longitudeDelta: number; // Not directly used by GoogleMap, but part of the shared prop type
  };
  markers: {
    coordinate: {
      latitude: number;
      longitude: number;
    };
    title: string;
    description: string;
    color: string; // Not directly used by GoogleMarker default, but part of shared props
  }[];
  polyline: {
    latitude: number;
    longitude: number;
  }[]; // Not implemented for web in this version, but part of shared props
  style: any;
}

const PlatformMap: React.FC<PlatformMapProps> = ({
  initialRegion,
  markers,
  // polyline, // Polyline for web Google Maps would require a different approach
  style,
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "",
  });

  if (loadError) {
    return (
      <View style={style}>
        <Text>Error loading maps. Please check your API key and network.</Text>
      </View>
    );
  }

  if (!isLoaded) {
    return (
      <View style={style}>
        <Text>Loading Maps...</Text>
      </View>
    );
  }

  const center = {
    lat: initialRegion.latitude,
    lng: initialRegion.longitude,
  };

  // Determine a reasonable zoom level based on deltas if available
  // This is a heuristic and might need adjustments
  let zoom = 12; // Default zoom
  if (initialRegion.latitudeDelta && initialRegion.longitudeDelta) {
    const latZoom = Math.log2(360 / initialRegion.latitudeDelta);
    const lngZoom = Math.log2(360 / initialRegion.longitudeDelta);
    zoom = Math.min(Math.floor(latZoom), Math.floor(lngZoom), 18); // Cap zoom at 18
  }

  return (
    <GoogleMap mapContainerStyle={style} center={center} zoom={zoom}>
      {markers.map((marker, index) => (
        <GoogleMarker
          key={index}
          position={{
            lat: marker.coordinate.latitude,
            lng: marker.coordinate.longitude,
          }}
          title={marker.title}
          label={marker.description}
          // icon={{ url: marker.color === 'green' ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' }} // Example for custom icons based on color
        />
      ))}
      {/* Polyline for Google Maps web would use <Polyline options={{ path: polyline.map(p => ({lat: p.latitude, lng: p.longitude})) }} /> */}
    </GoogleMap>
  );
};

export default PlatformMap;
