**EcoRoute Mobile App Test**

**Purpose**
This test evaluates your ability to build a self-contained mobile prototype using React Native or Flutter. You will implement core screens, state management, networking with a mock backend, and demonstrate clean architecture and UX.

---

## Test Instructions

### 1. Project Initialization

* **Choose one** mobile framework:

  * React Native (Expo CLI or bare)
  * Flutter
* **Start a new project**:

  * React Native: `npx expo init EcoRouteMobile` or `npx react-native init EcoRouteMobile`
  * Flutter: `flutter create eco_route_mobile`
* **Install** required packages:

  * React Native: `npm install @react-navigation/native axios react-native-maps && expo install react-native-safe-area-context react-native-screens`
  * Flutter: add to `pubspec.yaml`

    ```yaml
    provider: ^6.0.0
    http: ^0.13.0
    google_maps_flutter: ^2.0.0
    ```
* **Verify** the blank app runs on an Android or iOS simulator/emulator.

---

### 2. Mock Backend Setup

* **Create** `assets/routes.json` with the following data:

  ```json
  [
    {"mode":"driving","distance_km":12.3,"time_min":18,"co2_g":2214,"score":240.4},
    {"mode":"bicycling","distance_km":12.3,"time_min":45,"co2_g":0,"score":45.0},
    {"mode":"transit","distance_km":12.3,"time_min":25,"co2_g":0,"score":25.0},
    {"mode":"walking","distance_km":12.3,"time_min":150,"co2_g":0,"score":150.0}
  ]
  ```
* **Load** this JSON:

  * React Native: direct import (`import routes from './assets/routes.json'`) or via `json-server --watch assets/routes.json --port 3000`
  * Flutter: declare in `pubspec.yaml` assets and load with `rootBundle.loadString`
* **Endpoint assumption**: `GET http://localhost:3000/routes` or asset import.

---

### 3. Required Screens

1. **Input Screen**

   * Two text fields: **From** and **To** addresses
   * **Find Routes** button:

     * Enabled only when both fields are non-empty
     * On tap, fetch the mock routes
   * Show loading indicator during fetch
   * On failure, display an error message

2. **Results Screen**

   * Receive routes array: `{mode, distance_km, time_min, co2_g, score}`
   * **Sort** ascending by `score` and **display top 3**
   * Each item displays:

     * Mode icon/name
     * Distance (`km`)
     * Time (`min`)
     * CO₂ (`g`)
     * Score badge
   * Tap on an item to navigate to Map Preview (optional)

3. **Map Preview Screen** (Bonus)

   * Display a map with a simple polyline between two dummy coordinates
   * Show start/end markers
   * Toggle back to the list view

---

### 4. Architecture Guidelines

* **State management**:

  * React: Context/hooks or lightweight library
  * Flutter: Provider or setState
* **Networking**:

  * Use `axios`/`fetch` or `http`
  * Gracefully handle errors
* **Project structure** example:

  ```text
  /assets       # routes.json, icons
  /components   # reusable UI widgets
  /screens      # Input, Results, Map
  /services     # route fetching logic
  ```
* **Styling & UX**:

  * Consistent spacing and typography
  * Touch targets ≥48×48 dp
  * Clear visual feedback for loading and errors

---

### 5. Documentation

Include a `README.md` with:

* **Quick Start**: install, run app, start mock server (if used)
* **Mock Data**: location and loading method for `routes.json`
* **Design Decisions**: framework choices, libraries, structure
* **Next Steps** (150–200 words): roadmap to production-grade app (real API, caching, auth, CI/CD)

---

### 6. Submission Deliverables

* **Git repository** link
* Completed **README.md**
* (Optional) Short **screen recording** or GIF demonstrating app flow
* **Timeline**: submit within **2–3 days**

---

### 7. Evaluation Criteria

| Criterion                   | Expectation                                           |
| --------------------------- | ----------------------------------------------------- |
| **Self-Containment**        | App runs immediately with provided mock JSON          |
| **Code Organization**       | Clear folder structure, modular components            |
| **State & Navigation**      | Proper management and screen transitions              |
| **UI/UX Quality**           | Readable layout, accessible controls, clear feedback  |
| **Data Handling & Errors**  | Fetch logic is robust, errors are user-friendly       |
| **Map Integration (Bonus)** | Basic map rendering with polyline and markers         |
| **Documentation**           | Instructions are clear; rationale is well-explained   |
| **Creativity (Bonus)**      | Additional polish: animations, theming, minimal tests |

---

**End of Test Instructions**
