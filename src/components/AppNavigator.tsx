import { RootStackParamList } from "../types/navigation";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import InputScreen from "../components/screens/InputScreen";
import MapPreviewScreen from "../components/screens/MapPreviewScreen";
import ResultsScreen from "../components/screens/ResultsScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Input">
      <Stack.Screen
        name="Input"
        component={InputScreen}
        options={{ title: "Find Eco Routes" }}
      />
      <Stack.Screen
        name="Results"
        component={ResultsScreen}
        options={{ title: "Route Results" }}
      />
      <Stack.Screen
        name="MapPreview"
        component={MapPreviewScreen}
        options={{ title: "Route Preview" }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
