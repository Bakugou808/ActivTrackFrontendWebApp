import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { normalizeString } from "./AttributeFields";

export const AttsCard = ({ exObj, device, orientation }) => {
  const [exAtts, setExAtts] = useState([]);

  useEffect(() => {
    exObj && setExAtts(exObj.circuit_exercise_attributes);
  }, [exObj]);

  const renderAtts = () => {
    const x = [];
    for (const [key, val] of Object.entries(exAtts)) {
      let key1 = normalizeString(key);
      let att = normalizeString(exAtts[key]);
      key !== "restPeriod" &&
        x.push(
          <div key={key} className="attCardDiv">
            <p
              className={device === "mobile" ? "attCardPMobPort" : "attCardP"}
            >{`${key1}: ${att}`}</p>
          </div>
        );
    }

    return x.map((div) => {
      return div;
    });
  };
  return <div className="attCardCont2">{exObj && renderAtts()}</div>;
};

const mapStateToProps = (store) => ({
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(AttsCard);
