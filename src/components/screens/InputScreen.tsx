import { getMockRoutes } from "@/src/services/routeService";
import { RootStackParamList } from "@/src/types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type InputScreenProps = NativeStackScreenProps<RootStackParamList, "Input">;

const InputScreen: React.FC<InputScreenProps> = ({ navigation }) => {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFindRoutes = async () => {
    if (!fromAddress.trim() || !toAddress.trim()) {
      Alert.alert(
        "Validation Error",
        'Both "From" and "To" fields are required.'
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const routes = await getMockRoutes();
      navigation.navigate("Results", { routes });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "An unknown error occurred.";
      setError(message);
      Alert.alert("Error", message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Where are you going?</Text>

      <TextInput
        style={styles.input}
        placeholder="From address"
        value={fromAddress}
        onChangeText={setFromAddress}
        returnKeyType="next"
      />
      <TextInput
        style={styles.input}
        placeholder="To address"
        value={toAddress}
        onChangeText={setToAddress}
        returnKeyType="search"
        onSubmitEditing={handleFindRoutes} // Optionally submit on keyboard search button
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      ) : (
        <View style={styles.buttonContainer}>
          <Button
            title="Find Routes"
            onPress={handleFindRoutes}
            disabled={!fromAddress.trim() || !toAddress.trim()} // Disable if fields are empty
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  label: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 12, // Increased for better touch target
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
    minHeight: 48, // Ensure touch target is adequate
  },
  buttonContainer: {
    marginTop: 10,
    minHeight: 48, // Ensure touch target for button
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
});

export default InputScreen;
