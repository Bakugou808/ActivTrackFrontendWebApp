import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";
// * react-scroll Imports
import { Link } from "react-scroll";

export const SideList = (props) => {
  const {
    sourceList,
    handleClick,
    exAttKeys,
    selected,
    setSelectedKey,
    device,
    orientation,
  } = props;
  const [exOrSess, setExOrSess] = useState(null);

  useEffect(() => {
    exAttKeys ? setExOrSess("ExerciseGraph") : setExOrSess("SessionGraph");
  }, [orientation, device]);

  const renderRows = () => {
    return sourceList.map((data) => {
      return (
        <div
          key={uuidv4()}
          className={
            device === "mobile" ? "sideListItemContMobLand" : "sideListItemCont"
          }
        >
          {exAttKeys ? (
            <p
              className={
                device === "mobile"
                  ? orientation === "landscape"
                    ? "sideListItemMobLand"
                    : "sideListItemMobPort"
                  : "sideListItem"
              }
              onClick={() => handleClick(data)}
            >
              {data[0]}
            </p>
          ) : device === "mobile" ? (
            <Link
              activeClass="active"
              to="sessGraph"
              smooth={true}
              duration={500}
              className={
                device === "mobile"
                  ? orientation === "landscape"
                    ? "sideListItemMobLand"
                    : "sideListItemMobPort"
                  : "sideListItem"
              }
              onClick={() => handleClick(data)}
            >
              {data[0]}
            </Link>
          ) : (
            <p
              className={
                device === "mobile"
                  ? orientation === "landscape"
                    ? "sideListItemMobLand"
                    : "sideListItemMobPort"
                  : "sideListItem"
              }
              onClick={() => handleClick(data)}
            >
              {data[0]}
            </p>
          )}

          {selected === data[0] &&
            exOrSess === "ExerciseGraph" &&
            (device === "mobile" ? (
              <Link
                activeClass="active"
                to="exGraph"
                smooth={true}
                duration={300}
                className={
                  device === "mobile" && orientation === "landscape"
                    ? "sideListExAttributesMobLand"
                    : "sideListExAttributes"
                }
              >
                {" "}
                {renderExAtts(exAttKeys)}{" "}
              </Link>
            ) : (
              <div
                activeClass="active"
                to="exGraph"
                smooth={true}
                duration={300}
                className={
                  device === "mobile" && orientation === "landscape"
                    ? "sideListExAttributesMobLand"
                    : "sideListExAttributes"
                }
              >
                {" "}
                {renderExAtts(exAttKeys)}{" "}
              </div>
            ))}
        </div>
      );
    });
  };

  const renderExAtts = (exAttArr) => {
    return exAttArr.map((att) => {
      return (
        <p
          key={uuidv4()}
          className="sideListItemAtts"
          onClick={() => setSelectedKey(att)}
        >
          {att}
        </p>
      );
    });
  };

  return (
    <Paper
      elevation={3}
      className={
        device === "mobile"
          ? orientation === "landscape"
            ? "sourceListMobLand"
            : "sourceListMobPort"
          : "sourceList"
      }
    >
      {sourceList.length > 0 && renderRows()}
    </Paper>
  );
};

const mapStateToProps = (store) => ({
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SideList);
