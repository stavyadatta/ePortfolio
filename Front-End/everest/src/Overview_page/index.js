import React from "react";
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import Casual from "./Casual_Overview_Page";
import Professional from "./Professional_Overview_Page";

const OverviewPage = (props) => {
  if(!props.profile){
    return(<div>Loading...</div>)
  }

  switch(props.profile.template){
    case "Casual":
      return <Route path="/profile"  component={Casual} />;
    case "Professional":
      return <Route path="/profile" component={Professional} />;
    default:
      return <Route path="/profile" component={Professional} />;
  }
}

const mapStateToProps = (state) => {
  return {
      profile:state.firebase.profile
  };
};

export default connect(mapStateToProps)(OverviewPage);
