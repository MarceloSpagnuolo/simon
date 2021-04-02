import React, { useRef, useState } from "react";
import "./Home.css";
import clip1 from "../../assets/simonSound1.mp3";
import clip2 from "../../assets/simonSound2.mp3";
import clip3 from "../../assets/simonSound3.mp3";
import clip4 from "../../assets/simonSound4.mp3";
import error from "../../assets/error.mp3";
import gana from "../../assets/win.mp3";
import { useCounter, useGetSet } from "react-use";
import Left from "../leftPanel/Left";
import Right from "../rightPanel/Right";
const COLORES = ["darkgreen", "darkred", "goldenrod", "darkblue"];
const FLASH = ["lightgreen", "tomato", "yellow", "lightskyblue"];

function Home() {
  const [language, setLanguage] = useState("spanish");
  const [getOn, setOn] = useGetSet(false);
  const [getIsStarted, setIsStarted] = useGetSet(false);
  const [
    ,
    { inc: incCurrentTick, reset: resetCurrentTick, get: getCurrentTick },
  ] = useCounter(0);
  const [, { inc: incTurn, reset: resetTurn, get: getTurn }] = useCounter(1);
  const [getSequence, setSequence] = useGetSet([]);
  const [getPlayerSequence, setPlayerSequence] = useGetSet([]);
  const [getIsCpuTurn, setIsCpuTurn] = useGetSet(false);
  const [getIntervalTick, setIntervalTick] = useGetSet();
  const [audiosRef, setAudiosRef] = useState([
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ]);
  const [buttonsRef, setButtonsRef] = useState([
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ]);
  const [getStrict, setStrict] = useGetSet(true);
  const [displayText, setDisplayText] = useState("");
  const [speed, setSpeed] = useGetSet(800);
  const [bitRate, setBitRate] = useGetSet(1);
  const [audioWin, setAudioWin] = useState(useRef());
  const [audioError, setAudioError] = useState(useRef());

  function power(e) {
    setOn(e.target.checked);
    setDisplayText("");
    resetTurn();
    setIsStarted(false);
  }

  function handleStrict(e) {
    setStrict(e.target.checked);
  }

  function start() {
    if (getOn() && !getIsStarted()) {
      setBitRate(1);
      setSpeed(800);
      setIsStarted(true);
      resetCurrentTick();
      resetTurn();
      setSequence([]);
      setPlayerSequence([]);
      for (let i = 0; i < 20; i++) {
        getSequence().push(Math.floor(Math.random() * 4));
      }
      setIsCpuTurn(true);
      setIntervalTick(setInterval(ticks, speed()));
    }
  }

  function ticks() {
    if (getCurrentTick() === getTurn()) {
      clearInterval(getIntervalTick());
      setIsCpuTurn(false);
    }

    if (getIsCpuTurn()) {
      tickVisual(getSequence()[getCurrentTick()]);
      incCurrentTick();
    }
  }

  function clearColor() {
    buttonsRef.forEach((ref, i) => {
      ref.current.style.background = COLORES[i];
    });
  }

  function flashColor() {
    buttonsRef.forEach((ref, i) => {
      ref.current.style.background = FLASH[i];
    });
    setTimeout(clearColor, 800);
  }

  function tickVisual(value) {
    audiosRef[value].current.playbackRate = bitRate();
    audiosRef[value].current.play();
    buttonsRef[value].current.style.background = FLASH[value];
    setTimeout(clearColor, 350);
  }

  function handleClick(index) {
    if (!getIsCpuTurn()) {
      getPlayerSequence().push(index);
      tickVisual(index);
      check();
    }
  }

  function check() {
    const index = getPlayerSequence().length - 1;
    if (getSequence()[index] !== getPlayerSequence()[index]) {
      setIsCpuTurn(true);
      miss();
    } else {
      if (index === 3) {
        win();
      } else if (getTurn() === getPlayerSequence().length) {
        setIsCpuTurn(true);
        setTimeout(next, 400);
      }
    }
  }

  function miss() {
    setDisplayText("NO!");
    setTimeout(() => {
      setDisplayText("");
    }, 2200);
    setTimeout(() => {
      audioError.current.play();
    }, 200);
    flashColor();
    if (getStrict()) {
      setTimeout(() => {
        setIsStarted(false);
        start();
      }, 1500);
    } else {
      setTimeout(() => {
        resetCurrentTick();
        setIsCpuTurn(true);
        setPlayerSequence([]);
        setIntervalTick(setInterval(ticks, speed()));
      }, 1500);
    }
  }

  function win() {
    setDisplayText("WIN!");
    let ganador = setInterval(() => {
      flashColor();
      setTimeout(() => {
        clearColor();
      }, 501);
    }, 1000);
    setTimeout(() => {
      setDisplayText("");
      setIsStarted(false);
      clearInterval(ganador);
    }, 12000);
    setTimeout(() => {
      audioWin.current.play();
    }, 200);
  }

  function next() {
    incTurn();
    setPlayerSequence([]);
    resetCurrentTick();
    if (getTurn() > 5 && getTurn() <= 10) {
      setSpeed(700);
      setBitRate(1.3);
    } else if (getTurn() > 10 && getTurn() <= 15) {
      setSpeed(600);
      setBitRate(1.6);
    } else if (getTurn() > 15) {
      setSpeed(500);
      setBitRate(1.9);
    }
    setIntervalTick(setInterval(ticks, speed()));
  }

  return (
    <div className="Container">
      <audio id="clip1" ref={audiosRef[0]}>
        <source src={clip1}></source>
      </audio>
      <audio id="clip2" ref={audiosRef[1]}>
        <source src={clip2}></source>
      </audio>
      <audio id="clip3" ref={audiosRef[2]}>
        <source src={clip3}></source>
      </audio>
      <audio id="clip4" ref={audiosRef[3]}>
        <source src={clip4}></source>
      </audio>
      <audio id="win" ref={audioWin}>
        <source src={gana}></source>
      </audio>
      <audio id="error" ref={audioError}>
        <source src={error}></source>
      </audio>

      <Left
        language={language}
        changeLanguage={(lengua) => {
          setLanguage(lengua);
        }}
      />

      <div className="simon">
        <div
          id="topleft"
          onClick={() => handleClick(0)}
          ref={buttonsRef[0]}
        ></div>
        <div
          id="topright"
          onClick={() => handleClick(1)}
          ref={buttonsRef[1]}
        ></div>
        <div
          id="bottomleft"
          onClick={() => handleClick(2)}
          ref={buttonsRef[2]}
        ></div>
        <div
          id="bottomright"
          onClick={() => handleClick(3)}
          ref={buttonsRef[3]}
        ></div>
        <div id="inner-circle">
          <div id="title" className="font-effect-emboss">
            SIMON!
          </div>
          <div id="switches">
            <input
              type="checkbox"
              className="toggle"
              id="on"
              onClick={(e) => power(e)}
              defaultChecked={getOn()}
            />
            <button className="button" id="start" onClick={() => start()}>
              Start
            </button>
            <input
              type="checkbox"
              className="toggle"
              id="strict"
              onChange={(e) => handleStrict(e)}
              defaultChecked="true"
            />
          </div>
          <div className="text1">
            <span>POWER</span>
            <span>STRICT</span>
          </div>
          <div className="turn" id="turno">
            {displayText || (getOn() ? (getIsStarted() ? getTurn() : "-") : "")}
          </div>
          <div className="text2">COUNT</div>
        </div>
      </div>

      <Right language={language} />
    </div>
  );
}

export default Home;
