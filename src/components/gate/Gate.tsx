import "./gate.css";
import data from '../../data/Slot';
import GateIcon from "../../assets/gate.png"

const Gate = () => {
    return (
        <div className='gateway'>
            <div className="gate">
                <div className="exit">
                    <div className="img">
                        <img src={GateIcon} alt="Exit" className='exit-icon'/>
                    </div>
                    <p>{data.gateway[0].name}</p>
                </div>
                <div className="entrance">
                    <div className="img">
                        <img src={GateIcon} alt="Entrance" className='entrance-icon'/>
                    </div>
                    <p>{data.gateway[1].name}</p>
                </div>
            </div>
        </div>
    );
};

export default Gate;