import Click_Icon from "../../assets/click.png";
import { SlotHook } from "../../redux/hooks/slotHooks";
import { countAvailable } from "../../utils/Utilities";

const CountingSlot = () => {
  const { slots, handleGetNearestSlots, nearestSlot } = SlotHook();
  const total = slots.length;
  // console.log(slots);
  const findSpacebtn = () => {
    handleGetNearestSlots();

    const nearestSpace = JSON.stringify(nearestSlot);
    sessionStorage.setItem("nearestSlot", nearestSpace);
  };

  const totalAvail = countAvailable(slots);
  const space = sessionStorage.getItem("nearestSlot");

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <button
        onClick={findSpacebtn}
        style={{
          backgroundColor: "rgb(222, 225, 222)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Tìm chỗ đỗ xe còn trống
        <span>
          <img
            src={Click_Icon}
            alt=""
            width={32}
            height={32}
            style={{ marginLeft: 15 }}
          />
        </span>
      </button>

      <ul
        style={{
          display: "flex",
          listStyle: "none",
          justifyContent: "space-around",
          fontSize: 18,
          alignItems: "center",
          marginTop: 16,
        }}
      >
        <li>
          <p>Total slots: {total}</p>
        </li>
        <li>
          <p>Available: {totalAvail}</p>
        </li>
      </ul>

      {/* display nearestSpace */}
      <div style={{ margin: 15 }}>
        {space ? (
          <>
            <p>Vị trí bãi đỗ xe: {nearestSlot.space_number}</p>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CountingSlot;
