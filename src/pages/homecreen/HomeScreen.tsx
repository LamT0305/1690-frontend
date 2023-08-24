import MapC from '../../components/Map/Map.tsx';
import "./style.css"
import CountingSlot from '../../components/counting-slot/CountingSlot';


const HomeScreen = () => {
    return (
        <div className='hoomscreen'>
            <div style={{display: 'flex', flexDirection: 'column', width: '100 %'}}>
                <CountingSlot/>
                <MapC/>
            </div>
        </div>
    );
};

export default HomeScreen;