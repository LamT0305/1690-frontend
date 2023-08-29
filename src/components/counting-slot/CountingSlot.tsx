import { useEffect, useState } from "react";
import Click_Icon from "../../assets/click.png";
import { SlotHook } from "../../redux/hooks/slotHooks";
import { countAvailable } from "../../utils/Utilities";

const CountingSlot = () => {
  const { slots, handleGetNearestSlots } = SlotHook();
  const total = slots.length;
  // console.log(slots);
  const findSpacebtn = () => {
    handleGetNearestSlots();
  };

  useEffect(() => {}, []);
  const totalAvail = countAvailable(slots);
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
    </div>
  );
};

export default CountingSlot;
