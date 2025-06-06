import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { Route } from "../../types";
import { getTopScoringRoutes } from "../../utils/routeUtils";

type ResultsScreenProps = NativeStackScreenProps<RootStackParamList, "Results">;

const ResultsScreen: React.FC<ResultsScreenProps> = ({ route, navigation }) => {
  const { routes } = route.params;

  const sortedRoutes = getTopScoringRoutes(routes, 3);

  const handleRoutePress = (selectedRoute: Route) => {
    navigation.navigate("MapPreview", { route: selectedRoute });
    // Alert.alert("Navigate to Map", `Would navigate to map for ${selectedRoute.mode}`);
  };

  const renderRouteItem = ({ item }: { item: Route }) => (
    <TouchableOpacity
      onPress={() => handleRoutePress(item)}
      style={styles.itemContainer}
    >
      <View style={styles.itemHeader}>
        <Text style={styles.itemMode}>{item.mode.toUpperCase()}</Text>
        <View style={styles.scoreBadge}>
          <Text style={styles.scoreText}>Score: {item.score.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.itemDetailsRow}>
        <Text style={styles.itemDetailText}>
          Distance: {item.distance_km} km
        </Text>
        <Text style={styles.itemDetailText}>Time: {item.time_min} min</Text>
      </View>
      <Text style={styles.itemDetailText}>CO₂ Emission: {item.co2_g} g</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Top 3 Routes</Text>
      <FlatList
        data={sortedRoutes}
        renderItem={renderRouteItem}
        keyExtractor={(item, index) => `${item.mode}-${index}-${item.score}`}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No routes to display. Try a different search.
          </Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />
      <View style={styles.footerButtonContainer}>
        <Button title="Find Other Routes" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  itemMode: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#444",
  },
  scoreBadge: {
    backgroundColor: "#e0f7fa",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  scoreText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#00796b",
  },
  itemDetailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  itemDetailText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#777",
  },
  footerButtonContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    minHeight: 48,
  },
});

export default ResultsScreen;
