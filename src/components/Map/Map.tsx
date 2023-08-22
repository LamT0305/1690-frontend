import "./map.css"
import "./gate.css"
import "./slot.css"
import Logo from "../../assets/parking.png"
import GateIcon from "../../assets/gate.png"

// import ExitIcon from "../../assets/exit.png"


interface Slt {
    id: string;
    isAvailable: boolean;
}

import {SlotHook} from "../../redux/hooks/slotHooks.tsx";
import {useEffect, useState} from "react";
import data from "../../data/Slot.tsx";

const Map = () => {
    const [arr, setArr] = useState<Slt[]>([]);
    const [brr, setBrr] = useState<Slt[]>([]);
    const [watchId, setWatchId] = useState<number>();

    const {slots, handleSetUserLocation, nearestSlot, userLocation, userLocationSvg} = SlotHook();


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

    function calculateUserCurrentLocationChangePercent(newPosition: any) {
        // .............
    }

    useEffect(() => {
        if ("geolocation" in navigator) {
            const id = navigator.geolocation.watchPosition(
                position => {
                    console.log("location: " + position.coords.latitude + " " + position.coords.longitude);
                    handleSetUserLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });

                    calculateUserCurrentLocationChangePercent(position);
                },
                error => {
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
    }, [])


    return (
        <>
            <div className='map-container'
                 style={{display: 'flex', backgroundColor: '#F0EDED', width: '100%', position: 'relative'}}>
                <svg height="100%" width={"100%"} style={{
                    position: 'absolute',
                    top: 0
                }}>
                    {/*change to variable*/}
                    <line x1={"80%"} y1="49.2%" x2={"80%"} y2={"75%"}
                          style={{stroke: "green", strokeWidth: 8}}/>
                    <line x1="10.55%" y1="50%" x2="80%" y2="50%" style={{stroke: "green", strokeWidth: 8}}/>
                    <line x1="11%" y1="44%" x2="11%" y2="50%" style={{stroke: "green", strokeWidth: 8}}/>

                    <circle cx="11%" cy="44%" r="10" stroke="red" strokeWidth="3" fill="red"/>
                    <circle cx="30%" cy="44%" r="10" stroke="red" strokeWidth="3" fill="red"/>
                    <circle cx="30%" cy="56%" r="10" stroke="red" strokeWidth="3" fill="red"/>


                    <circle cx="80%" cy="75%" r="10" stroke="blue" strokeWidth="3" fill="blue"/>

                    {/*<line x1="0" y1="0" x2="100%" y2="100%" style={{stroke: "green", strokeWidth: 10}}/>*/}
                </svg>

                <div style={{width: '60%'}}>
                    <div
                        className='container'
                        style={{
                            width: '100%',
                            height: 'auto',
                        }}
                    >
                        <div className='row'>
                            {arr.map((item) => (
                                <div
                                    className='col'
                                    key={item.id}
                                    style={{
                                        backgroundColor: item.isAvailable ? "#9BF199" : '#F19999',
                                        position: 'relative'
                                    }}>
                                    <div
                                        className="slot-image"
                                    >
                                        <img src={Logo} alt="Parking lot"
                                             style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className='row'>
                            {brr.map((item) => (
                                <div
                                    className='col'
                                    key={item.id}
                                    style={{
                                        backgroundColor: item.isAvailable ? "#9BF199" : '#F19999',
                                        position: 'relative'
                                    }}>
                                    <div
                                        className="slot-image"
                                    >
                                        <img src={Logo} alt="Parking lot"
                                             style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="" style={{width: '40%'}}>
                    <div className='gateway'>
                        <div className="gate">
                            <div className="exit">
                                <div className="img">
                                    <img src={GateIcon} alt="Exit" className='exit-icon'/>
                                </div>
                                <p>{data.gateway[1].name}</p>
                            </div>
                            <div className="entrance">
                                <div className="img">
                                    <img src={GateIcon} alt="Entrance" className='entrance-icon'/>
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