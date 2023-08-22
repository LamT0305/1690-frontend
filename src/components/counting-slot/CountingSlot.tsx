import data from '../../data/Slot';


const CountingSlot = () => {
    const total = data.slots.length;

    return (
        <div>
            <button>Tìm chỗ đỗ xe còn trống</button>

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
                        Available: {3}
                    </p>
                </li>
            </ul>
        </div>
    );
};

export default CountingSlot;