import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import PatchRecordPt1 from "./PatchRecordPt1";
import PatchRecordPt2 from "./PatchRecordPt2";

export const PatchFlowCont = (props) => {
  const { record, setShowForm, workoutId } = props;
  const [customAttsParent, setCustomAttsParent] = useState({ reps: 1 });
  const [exFields, setExFields] = useState({
    exercise_name: "Add Exercise",
    description: "Add Description",
  });
  const [nextPage, goToNextPage] = useState(false);
  const handleCustomAdd = (atts, handleNext) => {
    setCustomAttsParent(atts);
    handleNext(true);
  };

  return (
    <div>
      {!nextPage ? (
        <PatchRecordPt1
          goToNextPage={goToNextPage}
          record={record}
          customAttsParent={customAttsParent}
          setCustomAttsParent={setCustomAttsParent}
          exFields={exFields}
          setExFields={setExFields}
          handleCustomAdd={handleCustomAdd}
        />
      ) : (
        <PatchRecordPt2
          setShowModal={setShowForm}
          exFields={exFields}
          customAtts={customAttsParent}
          record={record}
          workoutId={workoutId}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PatchFlowCont);
