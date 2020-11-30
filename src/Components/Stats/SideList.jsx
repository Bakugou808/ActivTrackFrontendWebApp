import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

export const SideList = (props) => {
  const {
    sourceList,
    handleClick,
    exAttKeys,
    selected,
    setSelectedKey,
  } = props;
  const [exOrSess, setExOrSess] = useState(null);

  useEffect(() => {
    exAttKeys ? setExOrSess("ExerciseGraph") : setExOrSess("SessionGraph");
  }, []);

  const renderRows = () => {
    return sourceList.map((data) => {
      return (
        <div className="sideListItemCont">
          <p className="sideListItem" onClick={() => handleClick(data)}>
            {data[0]}
          </p>
          {selected === data[0] && exOrSess === "ExerciseGraph" && (
            <div> {renderExAtts(exAttKeys)} </div>
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
    <Paper elevation={3} className="sourceList">
      {sourceList.length > 0 && renderRows()}
    </Paper>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SideList);
