import React from "react";
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import Casual from "./Casual_Account_Page";
import Professional from "./Professional_Account_Page";

const MyAccountPage = (props) => {
  if(!props.profile){
    return(<div>Loading...</div>)
  }

  switch(props.profile.template){
    case "Casual":
      return <Route path="/myaccount"  component={Casual} />;
    case "Professional":
      return <Route path="/myaccount" component={Professional} />;
    default:
      return <Route path="/myaccount" component={Professional} />;
  }
}

const mapStateToProps = (state) => {
  return {
      profile:state.firebase.profile
  };
};

export default connect(mapStateToProps)(MyAccountPage);
