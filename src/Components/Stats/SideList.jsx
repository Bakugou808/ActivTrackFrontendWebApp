import React, { Component } from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

export const SideList = (props) => {
  const { sourceList, handleClick } = props;
  const renderRows = () => {
    return sourceList.map((data) => {
      return (
        <p className="sideListItem" onClick={() => handleClick(data[1])}>
          {data[0]}
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
