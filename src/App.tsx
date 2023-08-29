import React, { useEffect } from "react";
import HomeScreen from "./pages/homecreen/HomeScreen";
import "./App.css";
import io from "socket.io-client";

const socket = io();

socket.on("connect", () => {
  console.log("Connected");
});

const App: React.FC = () => {
  useEffect(() => {
    socket.on("dataUpdated", (data: any) => {
      console.log("Received updated data from server", data);
    });

    const handleUpdate = () => {
      const dataToSend = { message: "Hello from client!" };

      socket.emit("updateData", dataToSend);
    };

    handleUpdate();
  }, []);
  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginTop: 50 }}>Parking Lot Map</h1>
      <HomeScreen />
    </div>
  );
};

export default App;
