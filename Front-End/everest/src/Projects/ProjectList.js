import React from "react";
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase"
import Casual from "./ProjectList_Casual";
import Professional from "./ProjectList_Professional";

const ProjectList = (props) => {
  if(!props.profile){
    return(<div>Loading...</div>)
  }

  switch(props.profile.template){
    case "Casual":
      return <Route path="/projects/:userId"  component={Casual} />;
    case "Professional":
      return <Route path="/projects/:userId" component={Professional} />;
    default:
      return <Route path="/projects/:userId" component={Professional} />;
  }
}

const mapStateToProps = (state, props) => {
  let uid = props.match.params.userId;
  return {
    profile: state.firestore.data.users && state.firestore.data.users[uid]
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => {
      let uid = props.match.params.userId;
      return [
          { collection: "users", doc: uid },
      ];
  })
)(ProjectList);
