import "./map.css";
import "./gate.css";
import "./slot.css";
import Logo from "../../assets/parking.png";
import GateIcon from "../../assets/gate.png";

// import ExitIcon from "../../assets/exit.png"

interface Slt {
  id: string;
  isAvailable: boolean;
}

interface userLocation {
  lat: number;
  lng: number;
}

import { SlotHook } from "../../redux/hooks/slotHooks.tsx";
import { useEffect, useState } from "react";
import data from "../../data/Slot.tsx";

const Map = () => {
  const [arr, setArr] = useState<Slt[]>([]);
  const [brr, setBrr] = useState<Slt[]>([]);
  const [watchId, setWatchId] = useState<number>();

  const [latPercent, setLatPercent] = useState<number>(0);
  const [longPercent, setLongPercent] = useState<number>(0);

  const gateLocation: userLocation = {
    lat: 20.9907777,
    lng: 105.9432744,
  };

  const {
    slots,
    handleSetUserLocation,
    nearestSlot,
    userLocation,
    userLocationSvg,
  } = SlotHook();

  function splitArray(array: any[]) {
    const arr = [];
    const brr = [];
    for (let i = 0; i < array.length / 2; i++) {
      arr.push(array[i]);
    }
    for (let i = array.length / 2; i < array.length; i++) {
      brr.push(array[i]);
    }
    const c = [arr, brr];
    return c;
  }

  function calculateUserCurrentLocationChangePercent(
    newPosition: any,
    gateLocation: userLocation
  ) {
    // Calculate the horizontal and vertical distances in pixels
    const horizontalDistancePx =
      newPosition.coords.longitude - gateLocation.lng;
    const verticalDistancePx = newPosition.coords.latitude - gateLocation.lat;

    // console.log(horizontalDistancePx);

    // Get the dimensions of the SVG viewport
    const svgWidth = 256;
    const svgHeight = 208;
    // Calculate the percentage distances
    const horizontalDistancePercent = (horizontalDistancePx / svgWidth) * 100;
    const verticalDistancePercent = (verticalDistancePx / svgHeight) * 100;

    setLatPercent(verticalDistancePercent);
    setLongPercent(horizontalDistancePercent);
    console.log(
      `Horizontal Distance Percent: ${horizontalDistancePercent}%`,
      `Vertical Distance Percent: ${verticalDistancePercent}%`
    );
  }

  useEffect(() => {
    if ("geolocation" in navigator) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          // Update userLocation state
          handleSetUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          console.log(
            `Latitude: ${position.coords.latitude}`,
            `Longitude: ${position.coords.longitude}`
          )

          // Calculate percentage changes using the updated userLocation
          calculateUserCurrentLocationChangePercent(position, gateLocation);
        },
        (error) => {
          console.error(error.message);
        }
      );

      return () => {
        navigator.geolocation.clearWatch(id);
      };
    } else {
      console.log("Geolocation is not available in this browser.");
    }
  }, []);

  useEffect(() => {
    const slts: Slt[] = [...slots];

    const result = splitArray(slts);
    setArr(result[0]);
    setBrr(result[1]);
  }, []);

  // dynamically adjust the length of lines
  const Y1Line1 = 86;
  const [Y2line1, setY2Line1] = useState<number>(49.2);
  const X1Line2 = 12.5;
  const [X2line2, setX2Line2] = useState<number>(86);
  const Y1Line3 = 38;
  const [Y2line3, setY2Line3] = useState<number>(50);

  useEffect(() => {
    if (Math.abs(Y2line1 - latPercent) <= Y1Line1) {
      setY2Line1(Math.abs(Y2line1 - latPercent));
    } else if (Math.abs(X2line2 - longPercent) <= X1Line2) {
      setX2Line2(Math.abs(X2line2 - longPercent));
    } else if (Math.abs(Y2line3 - (latPercent - 50)) <= Y1Line3) {
      setY2Line3(Math.abs(Y2line3 - (latPercent - 50)));
    }

    // console.log("a");
  }, []);
  return (
    <>
      <div
        className="map-container"
        style={{
          display: "flex",
          backgroundColor: "#F0EDED",
          width: "100%",
          position: "relative",
        }}
      >
        <svg
          height="100%"
          width={"100%"}
          style={{
            position: "absolute",
            top: 0,
            zIndex: 1,
          }}
        >
          {/*change to variable*/}
          <line
            x1={"86%"}
            y1={"49.2%"}
            x2={"86%"}
            y2={"75%"}
            style={{ stroke: "green", strokeWidth: 5 }}
          />
          <line
            x1="12.5%"
            y1="50%"
            x2="86%"
            y2="50%"
            style={{ stroke: "green", strokeWidth: 5 }}
          />
          <line
            x1="13%"
            y1="38%"
            x2="13%"
            y2="50%"
            style={{ stroke: "green", strokeWidth: 5 }}
          />

          <circle
            cx="13%"
            cy="38%"
            r="5"
            stroke="red"
            strokeWidth="3"
            fill="red"
          />

          <circle
            cx="86%"
            cy="75%"
            r="5"
            stroke="blue"
            strokeWidth="3"
            fill="blue"
          />

          {/*<line x1="0" y1="0" x2="100%" y2="100%" style={{stroke: "green", strokeWidth: 10}}/>*/}
        </svg>

        <div style={{ width: "75%" }}>
          <div
            // className="container"
            style={{
              width: "100%",
              height: "250px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div className="row">
              {arr.map((item) => (
                <div
                  className="col"
                  key={item.id}
                  style={{
                    backgroundColor: item.isAvailable ? "#9BF199" : "#F19999",
                    position: "relative",
                  }}
                >
                  <div className="slot-image">
                    <img
                      src={Logo}
                      alt="Parking lot"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="row">
              {brr.map((item) => (
                <div
                  className="col"
                  key={item.id}
                  style={{
                    backgroundColor: item.isAvailable ? "#9BF199" : "#F19999",
                    position: "relative",
                  }}
                >
                  <div className="slot-image">
                    <img
                      src={Logo}
                      alt="Parking lot"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="" style={{ width: "20%" }}>
          <div className="gateway">
            <div className="gate">
              <div className="exit">
                <div className="img">
                  <img src={GateIcon} alt="Exit" className="exit-icon" />
                </div>
                <p>{data.gateway[1].name}</p>
              </div>
              <div className="entrance">
                <div className="img">
                  <img
                    src={GateIcon}
                    alt="Entrance"
                    className="entrance-icon"
                  />
                </div>
                <p>{data.gateway[0].name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
