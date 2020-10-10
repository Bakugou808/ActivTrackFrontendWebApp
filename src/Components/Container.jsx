import AsyncStorage from "@react-native-community/async-storage";

import React, { useState, useEffect } from "react";
// react-native
import { StyleSheet, Text, View, ActivityIndicator } from "react-native"; //* View is similar to a <div>, Text is for when you're displaying text, StyleSheet allows you to create a stylesheet object with the StyleSheet.create method for style classes
import { NavigationContainer } from "@react-navigation/native";

// redux
import { connect } from "react-redux";
// navigation imports
import { DrawerNavigator } from "../Navigation/DrawerNavigator";
import { LoginSignUpNavigator } from "../Navigation/StackNavigator";
// action imports
import { fetchCurrentUser, restoreToken } from "../Redux/Actions/AuthActions";

function Container(props) {
  const { isLoggedIn, onRestoreToken, isLoading, onCheckUser } = props;

  useEffect(() => {
    const boostrapAsync = async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem("bigT");
      } catch (e) {
        console.log(e);
      }
      onRestoreToken(userToken);
      onCheckUser(userToken);
    };
    boostrapAsync();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <DrawerNavigator initialRouteName="Home" />
      ) : (
        <LoginSignUpNavigator />
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = (store) => ({
  isLoggedIn: store.authorized.isLoggedIn,
  userToken: store.authorized.token,
  isLoading: store.authorized.isLoading,
  user: store.authorized.user,
});

const mapDispatchToProps = (dispatch) => ({
  onCheckUser: (token) => dispatch(fetchCurrentUser(token)),
  onRestoreToken: (token) => dispatch(restoreToken(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Container);
