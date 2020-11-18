import React from "react";
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import Casual from "./ProjectList_Casual";
import Professional from "./ProjectList_Professional";

const ProjectList = (props) => {
  if(!props.profile){
    return(<div>Loading...</div>)
  }

  console.log({Casual});

  switch(props.profile.template){
    case "Casual":
      return <Route path="/projects/:userId"  component={Casual} />;
    case "Professional":
      return <Route path="/projects/:userId" component={Professional} />;
    default:
      return <Route path="/projects/:userId" component={Professional} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
      profile:state.firebase.profile
  };
};

export default connect(mapStateToProps)(ProjectList);