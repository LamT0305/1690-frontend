import React, { useEffect } from "react";
import HomeScreen from "./pages/homecreen/HomeScreen";
import "./App.css";


const App: React.FC = () => {

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginTop: 50 }}>Parking Lot Map</h1>
      <HomeScreen />
    </div>
  );
};

export default App;
