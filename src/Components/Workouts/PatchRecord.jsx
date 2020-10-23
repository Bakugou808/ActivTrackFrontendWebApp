import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import CircFlowCont from "../Circuits/CircFlowCont";
// * Action Imports

export const PatchRecord = (props) => {
  const { record, setShowForm, setPatchRecord } = props;

  /* 
1. fetch workout record belongs to --> should already by set
2. set Phase 
3. fetch exercise
4. fetch circuit
5. prefill form with Exercise name, description
--> make sure the position doesn't change from the record's data
6. circuit form 2 prefill attributes 
---> patch the circuit, do not post a new work_circuit, or add find-bycreate on backend
7. clear state fields
8. clear record state and close modal

*/

  //   useEffect(() => {

  //   }
  //   )
  return <div> 'Hiii'</div>;
  //   return <CircFlowCont setShowModal={setShowModal} />;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PatchRecord);
