import { getMockRoutes } from "../../services/routeService";
import { RootStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
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
        placeholderTextColor="#a9a9a9"
        value={fromAddress}
        onChangeText={setFromAddress}
        returnKeyType="next"
        accessibilityLabel="From address input"
      />
      <TextInput
        style={styles.input}
        placeholder="To address"
        placeholderTextColor="#a9a9a9"
        value={toAddress}
        onChangeText={setToAddress}
        returnKeyType="search"
        onSubmitEditing={handleFindRoutes}
        accessibilityLabel="To address input"
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            (!fromAddress.trim() || !toAddress.trim()) && styles.buttonDisabled,
          ]}
          onPress={handleFindRoutes}
          disabled={!fromAddress.trim() || !toAddress.trim()}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityState={{
            disabled: !fromAddress.trim() || !toAddress.trim(),
          }}
        >
          <Text style={styles.buttonText}>Find Routes</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 60,
    paddingHorizontal: 25,
    backgroundColor: "#f7f7f7",
  },
  label: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 40,
    color: "#2c2c2c",
  },
  input: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    fontSize: 17,
    color: "#333",
    minHeight: 50,
  },
  button: {
    marginTop: 25,
    paddingVertical: 15,
    alignItems: "center",
    minHeight: 50,
  },
  buttonText: {
    fontSize: 18,
    color: "#007AFF",
    fontWeight: "500",
  },
  buttonDisabled: {},
  loader: {
    marginTop: 25,
  },
  errorText: {
    color: "#D32F2F",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 15,
  },
});

export default InputScreen;
