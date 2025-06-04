import AppNavigator from "@/src/components/AppNavigator";
import { useColorScheme } from "@/src/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("@/assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }
  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
