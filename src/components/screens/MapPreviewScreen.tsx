import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, Dimensions, StyleSheet, Text, View } from "react-native";
import PlatformMap from "../PlatformMap";

type MapPreviewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "MapPreview"
>;

// Dummy coordinates for demonstration
const DUMMY_START_COORD = { latitude: 37.78825, longitude: -122.4324 }; // San Francisco
const DUMMY_END_COORD = { latitude: 37.75825, longitude: -122.4624 }; // Near SF

const MapPreviewScreen: React.FC<MapPreviewScreenProps> = ({
  route,
  navigation,
}) => {
  const { route: selectedRoute } = route.params;

  const markers = [
    {
      coordinate: DUMMY_START_COORD,
      title: "Start",
      description: "Dummy Start Location",
      color: "green",
    },
    {
      coordinate: DUMMY_END_COORD,
      title: "End",
      description: "Dummy End Location",
      color: "red",
    },
  ];

  const initialRegion = {
    latitude: (DUMMY_START_COORD.latitude + DUMMY_END_COORD.latitude) / 2,
    longitude: (DUMMY_START_COORD.longitude + DUMMY_END_COORD.longitude) / 2,
    latitudeDelta:
      Math.abs(DUMMY_START_COORD.latitude - DUMMY_END_COORD.latitude) * 2.5,
    longitudeDelta:
      Math.abs(DUMMY_START_COORD.longitude - DUMMY_END_COORD.longitude) * 2.5,
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Preview for: {selectedRoute.mode.toUpperCase()}
      </Text>
      <PlatformMap
        style={styles.map}
        initialRegion={initialRegion}
        markers={markers}
        polyline={[DUMMY_START_COORD, DUMMY_END_COORD]}
      />
      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}>
          Distance: {selectedRoute.distance_km} km
        </Text>
        <Text style={styles.detailText}>
          Time: {selectedRoute.time_min} min
        </Text>
        <Text style={styles.detailText}>CO₂: {selectedRoute.co2_g} g</Text>
        <Text style={styles.detailText}>
          Score: {selectedRoute.score.toFixed(1)}
        </Text>
      </View>
      <Button title="Back to Results" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
    color: "#333",
  },
  map: {
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.5,
    borderRadius: 10,
    marginBottom: 15,
  },
  detailsContainer: {
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    width: Dimensions.get("window").width * 0.95,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  detailText: {
    fontSize: 15,
    marginBottom: 5,
    color: "#444",
  },
});

export default MapPreviewScreen;
