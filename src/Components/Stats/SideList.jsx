import React, { useState, useEffect } from "react";
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
          className={
            device === "mobile" ? "sideListItemContMobLand" : "sideListItemCont"
          }
        >
          {/* { device === 'mobile' ? */}
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
          ) : (
            <Link
              activeClass="active"
              to="sessGraph"
              // spy={true}
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
          )}

          {selected === data[0] && exOrSess === "ExerciseGraph" && (
            <Link
              activeClass="active"
              to="exGraph"
              // spy={true}
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
          )}
        </div>
      );
    });
  };

  const renderExAtts = (exAttArr) => {
    return exAttArr.map((att) => {
      return (
        <p className="sideListItemAtts" onClick={() => setSelectedKey(att)}>
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
