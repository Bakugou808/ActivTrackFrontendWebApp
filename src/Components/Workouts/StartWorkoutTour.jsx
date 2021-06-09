import React from "react";
// * ReactTour Imports
import { connect } from "react-redux";
import Tour from "reactour";
import {
  START_WORKOUT_STEPS1,
  START_WORKOUT_STEPS2,
  START_WORKOUT_STEPS2B,
  ATT_STEPS,
  REST_STEPS,
  accentColor,
} from "../TourSteps";
import { endTour } from "../../Redux/Actions/TourActions";

const StartWorkoutTour = ({
  onEndTour,
  tourOn1,
  tourOn2,
  tourOn2B,
  tourOn3,
  tourOn4,
}) => {
  return (
    <div>
      <Tour
        onRequestClose={() => onEndTour()}
        steps={START_WORKOUT_STEPS1}
        isOpen={tourOn1}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <Tour
        onRequestClose={() => onEndTour()}
        steps={START_WORKOUT_STEPS2}
        isOpen={tourOn2}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <Tour
        onRequestClose={() => onEndTour()}
        steps={START_WORKOUT_STEPS2B}
        isOpen={tourOn2B}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <Tour
        onRequestClose={() => onEndTour()}
        steps={ATT_STEPS}
        isOpen={tourOn3}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <Tour
        onRequestClose={() => onEndTour()}
        steps={REST_STEPS}
        isOpen={tourOn4}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
    </div>
  );
};

const mapStateToProps = (store) => ({
  tourOn1: store.tour.sW1,
  tourOn2: store.tour.sW2,
  tourOn2B: store.tour.sW2B,
  tourOn3: store.tour.sW3,
  tourOn4: store.tour.sW4,
});

const mapDispatchToProps = (dispatch) => ({
  onEndTour: () => dispatch(endTour()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartWorkoutTour);
