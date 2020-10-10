import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

export const Folders = () => {
  return (
    <div>
      <>I am a folder container</>
    </div>
  );
};

const mapStateToProps = (store) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Folders);
