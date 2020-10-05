import React, { useState } from "react";
import style from "./style.module.scss"; //Import the main stylesheet

//Import the icons from react-icons
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";

const Header: React.FC = () => {
  const [open, setOpen] = useState(false); //Control the state of the mobile navigation menu

  //Create variables to control the style of the navbar
  let mobileWidth;
  let hamburgerColor;

  //If the header prop is set to open
  if (open) {
    mobileWidth = "100%";
    hamburgerColor = "white";
  }

  return (
    <div>
      <div className={style.parent}>
        <div className={style.header}>
          <a className={style.headerLogo} href="/">
            <img src="temp-logo.png" alt="MindVersity Logo"></img>
          </a>
          <div className={style.headerNav}>
            <div className={style.navWrapper} style={{ width: mobileWidth }}>
              <a className={style.navBtn} href="/chapters">
                Chapters
              </a>
              <a className={style.navBtn} href="/journal">
                Journal
              </a>
              <a className={style.navBtn} href="/resources">
                Resources
              </a>
              <a className={style.navBtn} href="/faq">
                FAQs
              </a>
              <div className={style.navBtn}>
                <FaSearch />
              </div>
              <div className={style.navBtn}>
                <FaMapMarkerAlt />
              </div>
            </div>
            <button
              className={style.navHamButton}
              style={{ color: hamburgerColor }}
              onClick={() => setOpen(!open)}
            >
              <AiOutlineMenu />
            </button>
          </div>
        </div>
        <div className={style.bottomBorder}></div>
      </div>
      <div className={style.headerContentSpacer}></div>
    </div>
  );
};

export default Header;
