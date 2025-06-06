import React from "react";
import { View, Text } from "react-native";
import {
  GoogleMap,
  Marker as GoogleMarker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { PlatformMapProps } from "../types/map";

const PlatformMap: React.FC<PlatformMapProps> = ({
  initialRegion,
  markers,
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

  let zoom = 12; // Default zoom
  if (initialRegion.latitudeDelta && initialRegion.longitudeDelta) {
    const latZoom = Math.log2(360 / initialRegion.latitudeDelta);
    const lngZoom = Math.log2(360 / initialRegion.longitudeDelta);
    zoom = Math.min(Math.floor(latZoom), Math.floor(lngZoom), 18);
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
        />
      ))}
    </GoogleMap>
  );
};

export default PlatformMap;
