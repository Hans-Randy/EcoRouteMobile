# EcoRoute Mobile App

This is a React Native (Expo) mobile application prototype designed to help users find eco-friendly routes. It allows users to input a start and end destination (conceptually) and view a list of mock transportation routes sorted by an eco-score.

---

## Quick Start

1.  **Prerequisites**:

    - Node.js (LTS version recommended)
    - npm or yarn
    - Expo Go app on your mobile device (for testing on a physical device) or an Android/iOS simulator/emulator.

2.  **Clone the repository** (if applicable) or ensure you have the project files.

3.  **Install dependencies**:

    ```bash
    npm install
    # or
    # yarn install
    ```

4.  **Run the application**:

    ```bash
    npm start
    # or
    # yarn start
    ```

    This will start the Metro bundler. You can then scan the QR code with the Expo Go app on your phone or run on a simulator (e.g., by pressing `a` for Android or `i` for iOS in the terminal if a simulator is set up).

5.  **Run Unit Tests**:
    ```bash
    npm test
    ```
    This command executes Jest to run unit tests for utility functions and services.

---

## Mock Data

- **Location**: The mock route data is stored in `assets/routes.json`.
- **Loading Method**:
  - The data is directly imported into the application using TypeScript's `resolveJsonModule` capability.
  - The `src/services/routeService.ts` file contains the `getMockRoutes` function which simulates fetching this data as if from an API, including a small artificial delay.
  - No external mock server (like `json-server`) is required to run this prototype as the data is bundled with the app.

---

## Design Decisions

- **Framework**: React Native with Expo was chosen for its rapid development capabilities, ease of setup, and extensive library support.
  - Expo SDK 53 is used as requested.
- **Language**: TypeScript is used for type safety and improved developer experience.
- **Navigation**: `@react-navigation/native` and `@react-navigation/native-stack` are used for screen transitions and managing the navigation flow between the Input, Results, and Map Preview screens.
- **HTTP Client (Conceptual)**: Although `axios` was installed as per instructions, the current implementation directly imports the mock JSON. If a real backend were used, `axios` would be the client for making API requests. The `routeService.ts` is structured to easily accommodate such a change.
- **Maps**: Platform-specific map implementations are used:
  - **Mobile (iOS/Android)**: `react-native-maps` is used for displaying maps, markers, and polylines.
  - **Web**: `@react-google-maps/api` is used for the web version. This requires a Google Maps JavaScript API key to be configured in a `.env` file as `REACT_APP_GOOGLE_MAPS_API_KEY`.
- **Project Structure**:
  ```
  /assets         # Static assets (images, fonts, routes.json)
  /src
      /assets       # DEPRECATED? (Consider moving all assets to top-level /assets or clarifying usage)
      /components   # Reusable UI components
          AppNavigator.tsx          # Main stack navigator
          PlatformMap.native.tsx  # Native map component
          PlatformMap.web.tsx     # Web map component
          /screens                # Screen components
              InputScreen.tsx
              ResultsScreen.tsx
              MapPreviewScreen.tsx
      /constants    # Application-wide constants (currently empty or not listed)
      /contexts     # React Context API for global state (currently empty or not listed)
      /hooks        # Custom React hooks (currently empty or not listed)
      # /navigation was likely merged into /components/AppNavigator.tsx
      /services     # Logic for data fetching
          routeService.ts
          /__tests__              # Unit tests for services
              routeService.test.ts
      /types        # TypeScript type definitions
          index.ts                # Main types (e.g., Route)
          map.ts                  # Map-related types (e.g., PlatformMapProps)
          navigation.ts           # Navigation parameter types
      /utils        # Utility functions
          routeUtils.ts
          /__tests__              # Unit tests for utilities
              routeUtils.test.ts
  App.tsx         # Root application component integrating navigation
  babel.config.js # Babel configuration (essential for Jest and TypeScript)
  index.ts        # Entry point for registering the root component
  # metro.config.js # (If present, for Metro bundler configuration)
  package.json    # Project dependencies and scripts
  tsconfig.json   # TypeScript configuration with path aliases for cleaner imports
  .env            # For environment variables (e.g., API keys) - NOT COMMITTED
  ```
- **State Management**: Primarily React component state (`useState`) is used for managing local screen states (input fields, loading, errors). For a larger application, React Context API or a dedicated state management library (like Zustand or Redux Toolkit) would be considered.
- **Styling**: React Native's `StyleSheet` API is used for styling. Efforts were made to maintain consistent spacing, typography, and ensure touch targets are adequately sized (≥48x48 dp where applicable).
- **Clean Coding**: Followed principles of separation of concerns (e.g., service layer for data, distinct screen components, navigation logic, platform-specific map components) and modularity. Unit tests for core logic have been introduced using Jest.

---

## Next Steps (Roadmap to Production)

To evolve EcoRoute Mobile into a production-grade application, several key areas would need development:

1.  **Real Backend Integration**: Replace the mock `routes.json` and `routeService.ts` with a robust backend API. This would involve integrating a real routing engine (e.g., Google Maps Directions API, Mapbox Directions API, or an open-source solution like OSRM) to calculate actual routes based on user input addresses. The `axios` library would be used for network requests, including comprehensive error handling, request/response interceptors for logging or auth, and cancellation.

2.  **Address Input & Geocoding**: Implement proper address input fields with autocomplete/suggestions using a geocoding service (e.g., Google Places API). This would convert user-typed addresses into geographic coordinates (latitude/longitude) required by routing APIs.

3.  **Advanced Map Features**: Enhance the `MapPreviewScreen` to display the actual route polyline received from the routing API on both mobile and web. Add turn-by-turn navigation (potentially integrating with device-native navigation apps), display of alternative routes on the map, and real-time traffic information.

4.  **State Management**: For more complex state interactions (e.g., user preferences, cached routes, global loading states), implement a more scalable state management solution like Zustand or Redux Toolkit. React Context API could be used for theming or simpler global states.

5.  **User Authentication & Profiles**: Add user accounts to save favorite routes, travel history, and personalize eco-friendly suggestions. This would involve backend support for user management and secure authentication (e.g., OAuth 2.0, JWT).

6.  **Enhanced UI/UX**: Refine the user interface with a professional design system, including custom icons for transport modes, animations, and transitions. Conduct UX research to optimize usability and accessibility (WCAG compliance).

7.  **Offline Support & Caching**: Implement caching strategies for frequently accessed routes or map tiles to improve performance and provide limited offline functionality (e.g., using AsyncStorage or a local database like SQLite).

8.  **Testing**: Expand testing coverage. Current unit tests (Jest) for services and utilities should be maintained and augmented. Introduce component testing (React Native Testing Library) for UI elements and user interactions, integration tests for navigation and data flow, and end-to-end tests (Appium, Detox) to ensure overall application stability.

9.  **CI/CD & Deployment**: Set up a Continuous Integration/Continuous Deployment (CI/CD) pipeline (e.g., using GitHub Actions, GitLab CI, or EAS Build/Submit) for automated testing, building, and deploying to app stores (Google Play Store, Apple App Store).

10. **Performance Optimization**: Profile and optimize app performance, paying attention to bundle size, startup time, and smooth map interactions.

---

This README provides an overview of the EcoRoute Mobile prototype.
