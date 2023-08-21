import React from 'react';
import Slot from '../Parking-slot/Slot';
import "./map.css"
import Gate from '../gate/Gate';
const map = () => {
    return (
        <div className='map-container' style={{display:'flex', backgroundColor:'#F0EDED', width:'100%'}}>
            <div style={{width:'60%'}}>
                <Slot />
            </div>
            <div className="" style={{width:'40%'}}>
                <Gate/>
            </div>
        </div>
    );
};

export default map;