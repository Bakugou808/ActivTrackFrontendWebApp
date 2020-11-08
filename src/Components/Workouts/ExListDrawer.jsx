import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

// * Function Imports
import { renderExercises } from "./Workout";

export const ExListDrawer = ({ warmup, body, coolDown, currentEx }) => {
  const [id, setId] = useState(null);

  useEffect(() => {
    setId(`${currentEx.ex_id}-${currentEx.circuit_position}`);
  }, [currentEx]);

  return (
    <div className="exSideDrawerParent">
      <div className="exSideDrawerHeader">
        <div className="container grid">
          {warmup && renderExercises(warmup)}
        </div>
        <div className="container grid">{body && renderExercises(body)}</div>
        <div className="container grid">
          {coolDown && renderExercises(coolDown)}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  formattedWorkout: store.workouts.formattedWorkout,
  warmup:
    store.workouts.formattedWorkout && store.workouts.formattedWorkout.warmup,
  body: store.workouts.formattedWorkout && store.workouts.formattedWorkout.body,
  coolDown:
    store.workouts.formattedWorkout &&
    store.workouts.formattedWorkout.cool_down,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ExListDrawer);
