import React from "react";
import foldersOrg from "../../SCSS/foldersOrg.jpg";
import buildWorkout from "../../SCSS/buildWorkout.png";
import runWorkout from "../../SCSS/runWorkout.png";
import attsPage from "../../SCSS/attsPage.png";
import exGraph from "../../SCSS/exGraph.png";
import sessGraph from "../../SCSS/sessGraph.png";

export default function About() {
  return (
    <div className="aboutCont">
      <div>
        ActivTrack is a site where you can build truly customized workout plans
        for your fitness goals.
      </div>

      <div className="aboutSection">
        <h3>
          With ActivTrack you can create folders to organize your different
          plans.
        </h3>
        <div className="aboutImg">
          <img src={foldersOrg} alt="folders page" />
        </div>
      </div>
      <div className="aboutSection">
        <h3>Create customized workouts</h3>
        <div className="aboutImg">
          <img src={buildWorkout} alt="workouts page" />
        </div>
      </div>
      <div className="aboutSection">
        <h3>Run the workouts you create</h3>
        <div className="aboutImg">
          <img src={runWorkout} alt="run workout page" />
        </div>
      </div>
      <div className="aboutSection">
        <h3>While tracking your performance</h3>
        <div className="aboutImg">
          <img src={attsPage} alt="attribute page" />
        </div>
      </div>
      <div className="aboutSection">
        <h3>And see your progress grow</h3>
        <p>View by exercise</p>
        <div className="aboutImg">
          <img src={exGraph} alt="exercise stats" />
        </div>
        <p>View by total reps</p>
        <div className="aboutImg">
          <img src={sessGraph} alt="session stats" />
        </div>
      </div>
      <div className="aboutSection">
        ActivTrack was developed as a free tool for those who want a
        fully-customized workout plan and are allergic to spreadsheets. Now lets
        get Active!
      </div>
    </div>
  );
}
