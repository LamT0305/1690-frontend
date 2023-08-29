import "./map.css";
import "./gate.css";
import "./slot.css";
import Logo from "../../assets/parking.png";
import GateIcon from "../../assets/gate.png";
import {useGeolocated} from "react-geolocated";
import IParkingSpace from "../../interfaces/parking-space.interface.tsx";
import {SlotHook} from "../../redux/hooks/slotHooks.tsx";
import React, {useEffect, useState} from "react";
import data from "../../data/Slot.tsx";
import {splitArray} from "../../utils/Utilities.tsx";
import {io} from "socket.io-client";

interface userLocation {
    lat: number;
    lng: number;
}

const Map: React.FC = () => {
    const [arr, setArr] = useState<IParkingSpace[]>([]);
    const [brr, setBrr] = useState<IParkingSpace[]>([]);

    const [latPercent, setLatPercent] = useState<number>(0);
    const [longPercent, setLongPercent] = useState<number>(0);

    const [userLocation, setUserLocation] = useState<userLocation>({
        lat: 20.9907906,
        lng: 105.9432935,
    });
    const {slots, handleGetSlots, nearestSlot, handleSetStatusSpace} =
        SlotHook();

    useEffect(() => {
        console.log("Calling handleGetSlots...");
        handleGetSlots();
        console.log(nearestSlot);
    }, []);

    // socket
    useEffect(() => {
        const socket = io("https://smart-car-parking-back-end.onrender.com", {
            transports: ["websocket"],
        });
        socket.emit("join", "123");

        socket.on("joined", () => {
            console.log("joined");
        });

    socket.on("updateLotStatus", (data: any) => {
      console.log("updateLotStatus", data);
      handleSetStatusSpace(data);
    });
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    return () => {
      socket.disconnect();
    };
  }, []);

    const {coords, isGeolocationAvailable, isGeolocationEnabled} =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: true,
            },
            userDecisionTimeout: 5000,
            watchPosition: true,
        });

    useEffect(() => {
        const slts: IParkingSpace[] = [...slots];

        const result = splitArray(slts);
        setArr(result[0]);
        setBrr(result[1]);

        if (coords) {
            // console.log("Latitude: " + coords.latitude);
            // console.log("Longitude: " + coords.longitude);
            const newPosition = {
                coords: {
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                },
            };
            calculateUserCurrentLocationChangePercent(
                newPosition,
                userLocation,
                setLatPercent,
                setLongPercent,
                setUserLocation
            );
        }
    }, [coords]);

    // dynamically adjust the length of lines
    const Y1Line1 = 49.2;
    const [Y2line1, setY2Line1] = useState<number>(75);
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
        // console.log("After changed: ", Y2line1);
        // console.log("After changed: ", X2line2);
        // console.log("After changed: ", Y2line3);
    }, [latPercent, longPercent]);

    return !isGeolocationAvailable ? (
        <div>Your browser does not support Geolocation</div>
    ) : !isGeolocationEnabled ? (
        <div>Geolocation is not enabled</div>
    ) : coords ? (
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
                {nearestSlot.space_number ? (
                    <>
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
                                y2={Y2line1.toString() + "%"}
                                // y2={"75%"}
                                style={{stroke: "green", strokeWidth: 5}}
                            />
                            <line
                                x1={nearestSlot.long.toString() + "%"}
                                y1="50%"
                                x2={X2line2.toString() + "%"}
                                // x2={"86%"}
                                y2="50%"
                                style={{stroke: "green", strokeWidth: 5}}
                            />
                            <line
                                x1={nearestSlot.long.toString() + "%"}
                                y1={nearestSlot.lat.toLocaleString() + "%"}
                                //
                                x2={nearestSlot.long.toString() + "%"}
                                y2={Y2line3.toString() + "%"}
                                // y2={"50%"}
                                style={{stroke: "green", strokeWidth: 5}}
                            />

                            <circle
                                cx={nearestSlot.long.toString() + "%"}
                                cy={nearestSlot.lat.toString() + "%"}
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
                    </>
                ) : null}

                <div style={{width: "75%"}}>
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
                                    key={item.space_number}
                                    style={{
                                        backgroundColor:
                                            item.status == "available"
                                                ? "#9BF199"
                                                : item.status == "taken"
                                                    ? "#F19999"
                                                    : "yellow",
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
                                    key={item.space_number}
                                    style={{
                                        backgroundColor:
                                            item.status == "available"
                                                ? "#9BF199"
                                                : item.status == "taken"
                                                    ? "#F19999"
                                                    : "yellow",
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
                <div className="" style={{width: "20%"}}>
                    <div className="gateway">
                        <div className="gate">
                            <div className="exit">
                                <div className="img">
                                    <img src={GateIcon} alt="Exit" className="exit-icon"/>
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
    ) : null;
};

export default Map;

function calculateUserCurrentLocationChangePercent(
    newPosition: {
        coords: {
            latitude: number;
            longitude: number;
        };
    },
    currentLocation: userLocation,
    setLatPercent: React.Dispatch<React.SetStateAction<number>>,
    setLongPercent: React.Dispatch<React.SetStateAction<number>>,
    setUserLocation: React.Dispatch<React.SetStateAction<userLocation>>
) {
    const latPercent =
        (Math.abs(newPosition.coords.latitude - currentLocation.lat) /
            currentLocation.lat) *
        1000000;

    // console.log(latPercent);

    const longPercent =
        (Math.abs(newPosition.coords.longitude - currentLocation.lng) /
            currentLocation.lng) *
        1000000;

    // console.log(longPercent);

    setLatPercent(latPercent);
    setLongPercent(longPercent);

    // set user location
    setUserLocation({
        lat: newPosition.coords.latitude,
        lng: newPosition.coords.longitude,
    });
}
