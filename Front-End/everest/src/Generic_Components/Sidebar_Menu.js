import React from "react";
import {slide as Menu} from "react-burger-menu";
import "./Sidebar_Menu.css";

export default props => {
    return (
      <Menu {...props}>
         <a className="menu-item" href="/">
          Home
        </a>
        <a className="menu-item" href="/about">
          About Us
        </a>
        <a className="menu-item" href="/">
          Search
        </a>
        <a className="menu-item" href="/login">
          Login
        </a>
        <a className="menu-item" href="/register">
          Register
        </a>
      </Menu>
    );
  };