import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { HOMESTEPS, accentColor } from "../TourSteps";
// * Framer Motion Imports
import { motion } from "framer-motion";
// * ReactTour Imports
import Tour from "reactour";
// * Material ui imports
import Button from "@material-ui/core/Button";
// action imports
import { logOut } from "../../Redux/Actions/AuthActions";
import { setGreeting } from "../../Redux/Actions/UserActions";

// component imports
import { AuthHOC } from "../AuthHOC";
import MyCarousel from "./MyCarousel";

export const Home = (props) => {
  const {
    user,
    onLogOut,
    match,
    history,
    device,
    orientation,
    greetingSetting,
    onSetGreeting,
  } = props;
  const [recentFolders, setRecentFolders] = useState(null);
  const [recentWorkouts, setRecentWorkouts] = useState(null);
  const [recentStats, setRecentStats] = useState(null);
  const [greeting, setGreeting] = useState(true);

  useEffect(() => {
    user.username && grabRecents();
    hideGreeting();
  }, [orientation, device, user]);

  const grabRecents = () => {
    let username = user.username;
    let f = JSON.parse(localStorage.getItem(`${username}RecentFolders`));
    setRecentFolders(f);
    let w = JSON.parse(localStorage.getItem(`${username}RecentWorkouts`));
    setRecentWorkouts(w);
    let s = JSON.parse(localStorage.getItem(`${username}RecentStats`));
    setRecentStats(s);
  };

  const hideGreeting = () => {
    setTimeout(() => setGreeting(false), 5100);
  };

  const [takeTour, setTakeTour] = useState(true);

  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  const toggleShowMore = () => {
    setIsShowingMore((prev) => !prev);
  };

  const openTour = () => {
    setIsTourOpen(true);
  };

  return (
    <div className="homeFloatCont">
      <Tour
        onRequestClose={() => setIsTourOpen(false)}
        steps={HOMESTEPS}
        isOpen={isTourOpen}
        maskClassName="mask"
        className="helper"
        rounded={5}
        accentColor={accentColor}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 3 }}
      >
        {takeTour && (
          <div className="tourNotification">
            <div>Take a Tour?</div>
            <Button onClick={openTour}>Yes</Button>
            <Button onClick={() => setTakeTour(false)}>No Thanks</Button>
          </div>
        )}
      </motion.div>
      <div className="homePageText exTitle fsize20">
        {greeting && (
          <div>
            <div className="greetingContainer">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-500vw" }}
                transition={{
                  delay: 3,
                  type: "tween",
                  ease: "easeOut",
                  duration: 2,
                }}
              >
                <motion.h1
                  initial={{ y: "250vw" }}
                  animate={orientation === "landscape" ? { y: -80 } : { y: 0 }}
                  transition={{
                    delay: 0.6,
                    type: "spring",
                    stiffness: 30,
                  }}
                  className="welcomeUser"
                >
                  <div className="exLineChart">Welcome</div>{" "}
                  <div className="exLineChart">{user.username}</div>
                </motion.h1>
              </motion.div>
            </div>
            <div className="greetingContainer">
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: "-250vw" }}
                transition={{
                  delay: 4.5,
                  type: "spring",
                  stiffness: 30,
                }}
              >
                <motion.div
                  initial={{ y: "250vw" }}
                  animate={
                    device === "mobile" && orientation === "portrait"
                      ? { y: -180 }
                      : { y: -233 }
                  }
                  transition={{
                    delay: 2.5,
                    type: "spring",
                    stiffness: 30,
                  }}
                >
                  <h1 className="letsGetBusy">Lets Get Busy</h1>
                </motion.div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Carousels Start Here */}
        <motion.div
          initial={{ y: "250vw" }}
          animate={
            device === "mobile"
              ? orientation === "portrait"
                ? { y: 0 }
                : { y: -100 }
              : { y: -20 }
          }
          transition={{
            delay: 4,
            type: "spring",
            stiffness: 30,
          }}
        >
          <div
            data-tour="hs1"
            className={
              orientation === "landscape"
                ? "HomeCarousel HCLand"
                : "HomeCarousel "
            }
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 3 }}
              className="folderCarousel "
              data-tour="hs2"
            >
              <div className="recentTitle">Recent Folders</div>
              <MyCarousel
                data={recentFolders}
                history={history}
                match={match}
                category="folders"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4.5, duration: 2 }}
              className="workoutCarousel"
              data-tour="hs3"
            >
              <div className="recentTitle">Recent Workouts</div>

              <MyCarousel
                data={recentWorkouts}
                history={history}
                match={match}
                category="workouts"
              />
            </motion.div>
            <motion.div
              data-tour="hs4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 2 }}
              className="statCarousel"
            >
              <div className="recentTitle">Recent Stats</div>

              <MyCarousel
                data={recentStats}
                history={history}
                match={match}
                category="stats"
              />
            </motion.div>
            <div></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user.user,
  device: store.device.device,
  orientation: store.device.orientation,
  greetingSetting: store.user.greeting,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logOut()),
  onSetGreeting: (setting) => dispatch(setGreeting(setting)),
});

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Home));
