import React, { useEffect } from "react";
import { connect } from "react-redux";
// action imports
import { logOut } from "../../Redux/Actions/AuthActions";

// component imports
import { AuthHOC } from "../AuthHOC";

export const Home = (props) => {
  const { user, onLogOut, match, history } = props;

  useEffect(() => {}, []);

  const handleRedirect = (params) => {
    history.push("/folders");
  };

  return (
    <div className="setDisplay exTitle fsize20">
      <div></div>
      <h1>Welcome {user.username}</h1>
      <div></div>
      <h2 className="pointer" onClick={handleRedirect}>
        Lets Get Busy
      </h2>
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
