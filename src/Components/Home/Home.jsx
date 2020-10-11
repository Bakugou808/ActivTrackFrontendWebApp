import React, { useEffect } from "react";
import { connect } from "react-redux";
// action imports
import { logOut } from "../../Redux/Actions/AuthActions";

// component imports
import { AuthHOC } from "../AuthHOC";

export const Home = (props) => {
  const { user, onLogOut } = props;

  useEffect(() => {}, []);

  return (
    <div>
      <h4>Welcome {user.username}.</h4>
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
