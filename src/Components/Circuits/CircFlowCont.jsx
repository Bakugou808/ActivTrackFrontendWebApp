import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
// * Component Imports
import CircuitFormPt1 from "./CircuitFormPt1";
import CircuitFormPt2 from "./CircuitFormPt2";

export const CircFlowCont = (props) => {
  const { setShowModal, circuit_type, nextPage, goToNextPage } = props;
  // const [nextPage, goToNextPage] = useState(false);

  // useEffect(() => {
  //   setGoNext(nextPage);
  // }, [nextPage]);

  return (
    <div className="circFlowContPort">
      {!nextPage ? (
        <CircuitFormPt1
          circuit_type={circuit_type}
          goToNextPage={goToNextPage}
        />
      ) : (
        <CircuitFormPt2
          circuit_type={circuit_type}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CircFlowCont);
