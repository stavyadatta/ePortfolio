import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Casual from "./Casual_My_Page";
import Professional from "./Professional_My_Page";

const MyPage = (props) => {
  if(!props.profile){
    return(<div>Loading...</div>)
  }

  switch(props.profile.template){
    case "Casual":
      return <Route path="/mypage/:userId"  component={Casual} />;
    case "Professional":
      return <Route path="/mypage/:userId" component={Professional} />;
    default:
      return <Route path="/mypage/:userId" component={Professional} />;
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
)(MyPage);
