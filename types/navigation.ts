import { Route } from "@/types";

export type RootStackParamList = {
  Input: undefined; // No parameters for InputScreen
  Results: { routes: Route[] }; // ResultsScreen expects an array of routes
  MapPreview: { route: Route }; // Optional: MapPreviewScreen expects a single route
};
