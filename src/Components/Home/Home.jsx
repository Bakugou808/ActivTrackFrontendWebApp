import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

// * Framer Motion Imports
import { motion } from "framer-motion";
// action imports
import { logOut } from "../../Redux/Actions/AuthActions";

// component imports
import { AuthHOC } from "../AuthHOC";
import MyCarousel from "./MyCarousel";

export const Home = (props) => {
  const { user, onLogOut, match, history, device, orientation } = props;
  const [recentFolders, setRecentFolders] = useState(null);
  const [recentWorkouts, setRecentWorkouts] = useState(null);
  const [recentStats, setRecentStats] = useState(null);

  useEffect(() => {
    user.username && grabRecents();
  }, [orientation, device, user]);

  const grabRecents = () => {
    let username = user.username;
    console.log(username);
    let f = JSON.parse(localStorage.getItem(`${username}RecentFolders`));
    setRecentFolders(f);
    let w = JSON.parse(localStorage.getItem(`${username}RecentWorkouts`));
    setRecentWorkouts(w);
    let s = JSON.parse(localStorage.getItem(`${username}RecentStats`));
    setRecentStats(s);
    console.log(recentWorkouts, recentFolders, recentStats);
  };

  const formatTitles = (titleArr) => {
    let titles = titleArr.map((title) => {
      let split = title.split("/");
      let ind = split.length - 2;
      return split[ind];
    });
    return titles;
  };

  const handleRedirect = (params) => {
    history.push("/folders");
  };

  return (
    <div className="homePageText exTitle fsize20">
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
            animate={orientation === "landscape" ? { y: -50 } : { y: 0 }}
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
          <motion.h2
            initial={{ y: "250vw" }}
            animate={
              device === "mobile" && orientation === "portrait"
                ? { y: -180 }
                : { y: -200 }
            }
            transition={{
              delay: 2.5,
              type: "spring",
              stiffness: 30,
            }}
          >
            <h1 className="letsGetBusy">Lets Get Busy</h1>
          </motion.h2>
        </motion.div>
      </div>

      {/* Carousels Start Here */}
      <motion.div
        initial={{ y: "250vw" }}
        animate={
          device === "mobile"
            ? orientation === "portrait"
              ? { y: -400 }
              : { y: -500 }
            : { y: -380 }
        }
        transition={{
          delay: 3,
          type: "spring",
          stiffness: 30,
        }}
      >
        <div
          className={
            orientation === "landscape" ? "HomeCarousel HCLand" : "HomeCarousel"
          }
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4, duration: 3 }}
            className="folderCarousel"
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
        </div>
      </motion.div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user.user,
  device: store.device.device,
  orientation: store.device.orientation,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logOut()),
});

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Home));
