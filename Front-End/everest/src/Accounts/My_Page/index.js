import React from "react";
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import Casual from "./Casual_My_Page";
import Professional from "./Professional_My_Page";

const MyPage = (props) => {
  if(!props.profile){
    return(<div>Loading...</div>)
  }

  switch(props.profile.template){
    case "Casual":
      return <Route path="/mypage"  component={Casual} />;
    case "Professional":
      return <Route path="/mypage" component={Professional} />;
    default:
      return <Route path="/mypage" component={Professional} />;
  }
}

const mapStateToProps = (state) => {
  return {
      profile:state.firebase.profile
  };
};

export default connect(mapStateToProps)(MyPage);
