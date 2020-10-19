import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Material UI Imports
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Button } from "@material-ui/core";
// * Action Imports
import { patchCircuit } from "../../Redux/Actions/CircuitActions";

export const SetIconUi = (props) => {
  const { setCount, circuitId, onPatchCircuit } = props;
  const [setVal, setSetVal] = useState(1);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setCount && setSetVal(setCount);
  }, [setCount]);

  const handlePatchCircuit = () => {
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("patching circuit", setVal);
    setShowForm(false);
    const circuitData = { circuit: { id: circuitId, sets: setVal } };
    // !still need to test this
    onPatchCircuit(circuitData);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handlePatchCircuit}
      >
        {showForm ? (
          <form onSubmit={handleSubmit}>
            <input
              type="number"
              value={setVal}
              onChange={(e) => setSetVal(e.target.value)}
            />
          </form>
        ) : (
          setVal
        )}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onPatchCircuit: (circuitData) => dispatch(patchCircuit(circuitData)),
});
export default connect(mapStateToProps, mapDispatchToProps)(SetIconUi);
