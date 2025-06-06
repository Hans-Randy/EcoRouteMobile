import { Route } from "@/types";

export type RootStackParamList = {
  Input: undefined;
  Results: { routes: Route[] };
  MapPreview: { route: Route };
};
