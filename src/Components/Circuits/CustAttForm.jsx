import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// * Material UI Imports
import TextField from "@material-ui/core/TextField";

export const CustAttForm = (props) => {
  const {
    customAtts,
    setCustomAtts,
    setShowCustomAttFields,
    setOpenSnackBar,
  } = props;
  const [customAtt, setCustomAtt] = useState("");

  const handleAddAtt = (e) => {
    e.preventDefault();
    // customAtts.includes(customAtt)
    //   ? setCustomAtts((prev) => prev.filter((att) => att != customAtt))
    //   : setCustomAtts((prev) => [...prev, customAtt]);
    !customAtts.includes(customAtt) &&
      setCustomAtts((prev) => [...prev, customAtt]);
    setOpenSnackBar(true);
    setShowCustomAttFields(false);
    setCustomAtt("");
  };

  return (
    <div>
      <form onSubmit={handleAddAtt}>
        <TextField
          id="outlined-basic"
          label="Custom Attribute"
          name="custom_attribute"
          value={customAtt}
          onChange={(e) => setCustomAtt(e.target.value)}
          variant="outlined"
        />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CustAttForm);
