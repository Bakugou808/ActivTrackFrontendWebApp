import React, { useEffect } from "react";
import { connect } from "react-redux";

// * Framer Motion Imports
import { motion } from "framer-motion";
// action imports
import { logOut } from "../../Redux/Actions/AuthActions";

// component imports
import { AuthHOC } from "../AuthHOC";
import MyCarousel from "./MyCarousel"

export const Home = (props) => {
  const { user, onLogOut, match, history } = props;

  useEffect(() => {}, []);

  const handleRedirect = (params) => {
    history.push("/folders");
  };

  return (
    <div className="homePageText exTitle fsize20">
      <h1>Welcome {user.username}</h1>
      <motion.h2
        initial={{ y: "250vw" }}
        animate={{ y: 0 }}
        transition={{
          delay: 0.6,
          // duration: 1.5, doesn't work with spring type
          type: "spring",
          stiffness: 30,
        }}
        className="pointer"
        onClick={handleRedirect}
      >
        <motion.p
          whileHover={{
            scale: 1.8,
            color: "#ffea00",
          }}
          transition={{ type: "spring", stiffness: 150 }}
        >
          Lets Get Busy
        </motion.p>
      </motion.h2>
      <div className="HomeCarousel">
          <div className="folderCarousel">
            <div>Recent Folders</div>
            {/* <MyCarousel data = {} /> */}
          </div>
          <div className="workoutCarousel">
          <div>Recent Workouts</div>

            {/* <MyCarousel data = {} /> */}
          </div>
          <div className="statCarousel">
          <div>Recent Stats</div>

            {/* <MyCarousel data = {} /> */}
          </div>
    </div>
  );
};

const mapStateToProps = (store) => ({
  user: store.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  onLogOut: () => dispatch(logOut()),
});

export default AuthHOC(connect(mapStateToProps, mapDispatchToProps)(Home));
