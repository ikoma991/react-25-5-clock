const Label = ({ name, val, setVal, isRunning, timerLabel, setMainTimer, setSubTimer }) => {
  const setTimer = (val, op) => {
    if (timerLabel === name) {
      if (op === 'increment') {
        setMainTimer(val + 1);
      } else if (op === 'decrement') {
        setMainTimer(val - 1);
      }
      setSubTimer(0);
    }
  };
  const handleIncrement = () => {
    if (val < 60 && !isRunning) {
      setVal(state => {
        setTimer(state, 'increment');
        return state + 1;
      });
    }
  };
  const handleDecrement = () => {
    if (val > 1 && !isRunning) {
      setVal(state => {
        setTimer(state, 'decrement');
        return state - 1;
      });
    }
  };

  return /*#__PURE__*/(
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", { id: `${name.toLowerCase()}-label` },
    `${name} Length`), /*#__PURE__*/


    React.createElement("button", {
      id: `${name.toLowerCase()}-increment`,
      onClick: handleIncrement }, /*#__PURE__*/
    React.createElement("svg", { viewBox: "0 0 320 512", width: "100", title: "angle-up" }, /*#__PURE__*/
    React.createElement("path", { d: "M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z" }))), /*#__PURE__*/



    React.createElement("p", { id: `${name.toLowerCase()}-length` },
    val), /*#__PURE__*/


    React.createElement("button", {
      id: `${name.toLowerCase()}-decrement`,
      onClick: handleDecrement }, /*#__PURE__*/
    React.createElement("svg", { viewBox: "0 0 320 512", width: "100", title: "angle-down" }, /*#__PURE__*/
    React.createElement("path", { d: "M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z" })))));




};

const App = () => {
  const [breakLength, setBreakLength] = React.useState(5);
  const [sessionLength, setSessionLength] = React.useState(25);
  const [isRunning, setIsRunning] = React.useState(false);
  const [mainTimer, setMainTimer] = React.useState(25);
  const [subTimer, setSubTimer] = React.useState(0);
  const [timerLabel, setTimerLabel] = React.useState("Session");
  const audioEl = React.useRef();
  let interval = null;

  const playSvg = /*#__PURE__*/React.createElement("svg", { viewBox: "0 0 448 512", width: "100", title: "play" }, /*#__PURE__*/
  React.createElement("path", { d: "M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" }));


  const pauseSvg = /*#__PURE__*/React.createElement("svg", { viewBox: "0 0 448 512", width: "100", title: "pause" }, /*#__PURE__*/
  React.createElement("path", { d: "M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z" }));


  const formatTimer = currTime => {
    if (currTime < 10) {
      return `0${currTime}`;
    }
    return currTime;
  };

  const setTimerLabels = () => {
    if (timerLabel === "Session") {
      setTimerLabel("Break");
      setMainTimer(breakLength);
    } else if (timerLabel === "Break") {
      setTimerLabel("Session");
      setMainTimer(sessionLength);
    }
    setSubTimer(0);
  };

  const reduceTime = () => {
    if (subTimer === 0) {
      setSubTimer(59);
      setMainTimer(mainTimer - 1);
    } else {
      setSubTimer(subTimer - 1);
    }
  };

  React.useEffect(() => {
    if (isRunning) {
      interval = setInterval(reduceTime, 1000);
      if (mainTimer === 0 && subTimer === 0) {
        clearInterval(interval);
        audioEl.current.play();
        setTimerLabels();
      }
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, setTimerLabels]);


  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setIsRunning(false);
    setMainTimer(25);
    setSubTimer(0);
    setTimerLabel("Session");
    audioEl.current.pause();
    audioEl.current.currentTime = 0;
  };

  return /*#__PURE__*/(
    React.createElement("div", { className: "main" }, /*#__PURE__*/
    React.createElement("div", { className: "container" }, /*#__PURE__*/
    React.createElement("h1", null, "25+5 Clock"), /*#__PURE__*/
    React.createElement("div", { className: "label-container" }, /*#__PURE__*/
    React.createElement(Label, {
      name: "Break",
      val: breakLength,
      setVal: setBreakLength,
      isRunning: isRunning,
      timerLabel: timerLabel,
      setMainTimer: setMainTimer,
      setSubTimer: setSubTimer }), /*#__PURE__*/

    React.createElement(Label, {
      name: "Session",
      val: sessionLength,
      setVal: setSessionLength,
      isRunning: isRunning,
      timerLabel: timerLabel,
      setMainTimer: setMainTimer,
      setSubTimer: setSubTimer })), /*#__PURE__*/


    React.createElement("div", { class: "timer-container" }, /*#__PURE__*/
    React.createElement("div", null, /*#__PURE__*/
    React.createElement("h2", { id: "timer-label" }, timerLabel, " "), /*#__PURE__*/
    React.createElement("p", { id: "time-left" },
    formatTimer(mainTimer), ":", formatTimer(subTimer)))), /*#__PURE__*/



    React.createElement("div", { class: "controls-container" }, /*#__PURE__*/
    React.createElement("button", { id: "start_stop",
      onClick: handlePlayPause },
    isRunning ? pauseSvg : playSvg), /*#__PURE__*/

    React.createElement("button", { id: "reset",
      onClick: handleReset }, /*#__PURE__*/
    React.createElement("svg", { viewBox: "0 0 512 512", width: "100", title: "sync" }, /*#__PURE__*/
    React.createElement("path", { d: "M440.65 12.57l4 82.77A247.16 247.16 0 0 0 255.83 8C134.73 8 33.91 94.92 12.29 209.82A12 12 0 0 0 24.09 224h49.05a12 12 0 0 0 11.67-9.26 175.91 175.91 0 0 1 317-56.94l-101.46-4.86a12 12 0 0 0-12.57 12v47.41a12 12 0 0 0 12 12H500a12 12 0 0 0 12-12V12a12 12 0 0 0-12-12h-47.37a12 12 0 0 0-11.98 12.57zM255.83 432a175.61 175.61 0 0 1-146-77.8l101.8 4.87a12 12 0 0 0 12.57-12v-47.4a12 12 0 0 0-12-12H12a12 12 0 0 0-12 12V500a12 12 0 0 0 12 12h47.35a12 12 0 0 0 12-12.6l-4.15-82.57A247.17 247.17 0 0 0 255.83 504c121.11 0 221.93-86.92 243.55-201.82a12 12 0 0 0-11.8-14.18h-49.05a12 12 0 0 0-11.67 9.26A175.86 175.86 0 0 1 255.83 432z" })))), /*#__PURE__*/



    React.createElement("audio", { ref: audioEl, src: "https://assets.mixkit.co/sfx/preview/mixkit-truck-reversing-beeps-loop-1077.mp3", id: "beep" }))));




};

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));