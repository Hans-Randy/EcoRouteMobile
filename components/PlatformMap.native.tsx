import React from "react";
import MapView, {
  Marker as RNMarker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { PlatformMapProps } from "../types/map";

const PlatformMap: React.FC<PlatformMapProps> = ({
  initialRegion,
  markers,
  polyline,
  style,
}) => {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={style}
      initialRegion={initialRegion}
    >
      {markers.map((marker, index) => (
        <RNMarker
          key={index}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
          pinColor={marker.color}
        />
      ))}
      <Polyline coordinates={polyline} strokeColor="#007AFF" strokeWidth={4} />
    </MapView>
  );
};

export default PlatformMap;
