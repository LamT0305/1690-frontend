import {useEffect, useState} from 'react';
import Logo from "../../assets/parking.png"
import "./slot.css"
import IParkingSpace from '../../interfaces/parking-space.interface.tsx';
interface Slt {
    id: string;
    isAvailable: boolean;
}

import {SlotHook} from "../../redux/hooks/slotHooks.tsx";


const Slot = () => {
    const [arr, setArr] = useState<Slt[]>([]);
    const [brr, setBrr] = useState<Slt[]>([]);

    const {slots} = SlotHook();


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

    useEffect(() => {
        const slts: IParkingSpace[] = [...slots];

        const result = splitArray(slts);
        setArr(result[0]);
        setBrr(result[1]);
    }, [])

    return (
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
    );
};

export default Slot;