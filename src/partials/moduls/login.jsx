import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import login from "../../assets/images/icons/ic-login.png";
import eye from "../../assets/images/icons/ic-bi-eye.svg";
import eyeSlash from "../../assets/images/icons/ic-bi-eye-slash.svg";
import { getCookie, deleteCookie } from "../utilities/cookies";
gsap.registerPlugin(Draggable);


export default function Login({
  items,
  setActiveProgram,
  setMinimizeWindow,
  setCloseProgram,
  isLogIn,
  setIsLogIn,
  userName,
  setUserName
}) {
  const dragInstance = useRef();
  const dragWindow = useRef();
  const menuItem = useRef();
  const timeline = useRef(gsap.timeline());
  const [show, setShow] = useState(false);

  const [input, setInput] = useState("");

  const [passwordInput, setPasswordInput] = useState("");

  const handleNameInputField = (event) => {
    setInput(event.target.value);
  };

  const handlePasswordInputField = (event) => {
    setPasswordInput(event.target.value);
  };
  const [showPassword, setShowPassword] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      submitLogin();
    }
  };

  const submitLogin = (e) => {
    if(passwordInput && input) {
      setIsLogIn(true);
      setUserName(input);
    }
  }

  const handleMenuItemClick = () => {
    setShow((myRef) => !myRef);
  };

  // useEffect(() => {
  //   if (getCookie("")) {
  //     var bs = Number(getCookie(""));
  //     setBestScore(bs);
  //   }
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dragInstance.current = Draggable.create(dragWindow.current, {
      bounds: ".draggable-container",
      trigger: ".drag-target-login",
      edgeResistance: 1,
      type: "x,y",
      inertia: false,
      autoScroll: true,
      cursor: "auto",
    });
    
  }, []);

  return (
    <div
      id="5"
      className={
        "window login windows-box-shadow " +
        items[4].active +
        " " +
        items[4].minimized
      }
      onClick={setActiveProgram}
      ref={dragWindow}
    >
      <div className="header drag-target-login">
        <div>Log on to Windows</div>
        <div className="header-buttons">
          <div
            id="min-5"
            className="minimize windows-box-shadow"
            onClick={setMinimizeWindow}
          ></div>
          <div className="maximize windows-box-shadow disabled"></div>
          <div
            id="close-5"
            className="close windows-box-shadow"
            onClick={setCloseProgram}
          >
            X
          </div>
        </div>
      </div>
      <div className="content">
        <div className="inner-content">
          <div className="row h-100">
            <div className="col-2 text-center">
              <img src={login} alt="login" />
            </div>
            {isLogIn ? 
            <React.Fragment>
              <div className="col-10">
                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                  <h3 className="mb-5">Welcome <span className="fw-bold">{userName}</span>!</h3>
                  <div className="buttons-wrapper">
                    <div id="close-5" className="cancel active-button" onClick={setCloseProgram}>Close</div>
                  </div>
                </div>
              </div>
            </React.Fragment> :
            <React.Fragment>
              <div className="col-7 p-0">
                <p className="fs-sm mb-4 text-start">Type a user name and password to log on to Windows</p>
                <div className="input-wrapper d-flex align-items-center gap-4 mb-4">
                  <p className="m-0 p-0 fs-sm">User name:</p>
                  <input
                    type="text"
                    className="inverse-windows-box-shadow"
                    maxLength="15"
                    value={input}
                    onChange={handleNameInputField}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                <div className="input-wrapper d-flex align-items-center gap-4">
                  <p className="m-0 p-0 fs-sm">Password:</p>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="inverse-windows-box-shadow"
                    value={passwordInput}
                    onChange={handlePasswordInputField}
                    onKeyDown={handleKeyDown}
                  />
                  <img onClick={() => setShowPassword((prev) => !prev)} src={showPassword ? eyeSlash : eye} alt="eye" />
                </div>
              </div>
              <div className="col-3">
                <div className="buttons-wrapper">
                  <div className="ok active-button" onClick={submitLogin}>OK</div>
                  <div id="close-5" className="cancel active-button" onClick={setCloseProgram}>Cancel</div>
                </div>
              </div>
            </React.Fragment>
            }
            </div>
        </div>
      </div>
    </div>
  );
}