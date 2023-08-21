import React from 'react';
import MapC from '../../components/Map/map';
import "./style.css"
import CountingSlot from '../../components/counting-slot/CountingSlot';
const HomeScreen = () => {
    return (
        <div className='hoomscreen' >
            <div style={{display:'flex', flexDirection:'column', width:'65%'}}>
                <CountingSlot />
                <MapC />
            </div>

        </div>
    );
};

export default HomeScreen;