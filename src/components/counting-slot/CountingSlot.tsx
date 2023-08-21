import React, { useEffect, useState } from 'react';
import data from '../../data/Slot';

interface Slot {
    id: string;
    isAvailable: boolean;
}

function countAvailable(slots: Slot[]) {
    let available = 0;
    for (let i = 0; i < slots.length; i++) {
        if (data.slots[i].isAvailable == true) {
            available++;
        }
    }

    return available;
}

const CountingSlot = () => {
    const total = data.slots.length;
    const [available, SetAvailable] = useState(0);

    useEffect(() => {
        SetAvailable(countAvailable(data.slots));
    }, [])

    return (
        <div>
            <ul style={{
                display: 'flex',
                listStyle: 'none',
                justifyContent: 'space-around',
                fontSize: 24,
                alignItems: 'center'
            }}>
                <li>
                    <p>Total slots: {total}</p>
                </li>
                <li>
                    <p>
                        Available: {available}
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default CountingSlot;