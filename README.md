# WeatherMap 2.0 

A modernized Angular application for managing city lists and viewing real-time weather data. 
Upgraded from Angular 5 to **Angular 13** with a premium "Glassmorphism" UI and integrated with [WeatherAPI.com](https://www.weatherapi.com/).

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-12.x-green?style=for-the-badge&logo=node.js&logoColor=white)

## ✨ Features

*   **Modern Upgrade**: Fully migrated codebase running on Angular 13 (compatible with Node 12).
*   **Premium UI**: Glassmorphism design system using CSS variables, blurred backgrounds, and smooth animations.
*   **Real-Time Data**: Integrated with **WeatherAPI.com** for accurate reporting.
*   **City Management**: Add, track, and remove customizable cities using a local JSON database.
*   **Search**: Dynamic city search with detailed current weather reports.

## 🛠 Prerequisites

Ensure you have the following installed:
*   **Node.js**: v12.22.x or higher (Tested on v12.22.12)
*   **npm**: v6.x or higher

## 🚀 Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/nizarsyed/openWeatherMap.git
    cd openWeatherMap
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

## ▶️ Usage

The application requires two separate terminal processes to run: one for the mock backend (JSON Server) and one for the Angular frontend.

### Step 1: Start the Backend
Open a terminal and run:
```bash
npm run json-server
```
*This starts a local API on port 3000 to save your city data.*

### Step 2: Start the Frontend
Open a **second** terminal and run:
```bash
npm start
```
*This serves the application at `http://localhost:4200`.*

### Step 3: Open in Browser
Navigate to [http://localhost:4200](http://localhost:4200) to use the app.

## 🔑 Configuration

The application is pre-configured with a WeatherAPI.com key.
To update it, edit `src/environments/environment.ts`:

```typescript
export const environment = {
  // ...
  weatherApi: {
    url: 'http://api.weatherapi.com/v1/current.json',
    apiKey: 'YOUR_API_KEY_HERE'
  }
};
```

## 🏗 Build

To build the project for production:

```bash
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

Run unit tests via Karma:
```bash
npm test
```
