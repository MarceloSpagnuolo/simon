import React, { useState } from "react";
import "./Home.css";
import clip1 from "./assets/simonSound1.mp3";
import clip2 from "./assets/simonSound2.mp3";
import clip3 from "./assets/simonSound3.mp3";
import clip4 from "./assets/simonSound4.mp3";
import simon from "./assets/simon.jpg";
import js from "./assets/js.png";
import html from "./assets/html.png";
import hooks from "./assets/hooks.png";
import react from "./assets/react.png";
import css from "./assets/css.png";
import spain from "./assets/spain2.png";
import eeuu from "./assets/eeuu.png";

function Home() {
    const [language,setLanguage] = useState("spanish");
    const [on,setOn] = useState(false);
    const [win,setWin] = useState(false);
    const [turn, setTurn] = useState(0);
    const [Strict, setStrict] = useState(true);
    const [init,setInit] = useState(false);
    const [current,setCurrent] = useState(0);
    const [order,setOrder] = useState([]);
    const [playerOrder,setPlayerOrder] = useState([]);
    const [good, setGood] = useState(true);
    const [compTurn,setCompTurn] = useState(false);
    const [intervalId,setIntervalId] = useState();
    const [suno,setUno] = useState("topleft");
    const [sdos,setDos] = useState("topright");
    const [stres,setTres] = useState("bottomleft");
    const [scuatro,setCuatro] = useState("bottomright");
    var intervalo;

    function power(e) {
        setOn(e.target.checked)
        e.target.checked ? setTurn(0) : setTurn("");
    }

    function start() {
        if(on && !init) {
            setInit(true);
            setCurrent(0);
            setTurn(1);
            setWin(false);
            setOrder([]);
            setPlayerOrder([]);
            setGood(true);
            for(let i = 0; i < 20; i++) {
                setOrder(order.push(Math.floor(Math.random() * 4) + 1));
            };
            setCompTurn(true);
            var intervalo = setInterval(gameTurn,800)
            console.log(intervalo);
            //setIntervalId(intervalo);
        };
    };

    function gameTurn() {
        console.log(turn,current, intervalo);
        setOn(false);

        if(current === turn) {
            console.log("entre aca")
            clearInterval(intervalo);
            setCompTurn(false);
            clearColor();
            setOn(true);
        };

        if(compTurn) {
            setTimeout(() => {
                if(order[current] == 1) one();
                if(order[current] == 2) dos();
                if(order[current] == 3) tres();
                if(order[current] == 4) cuatro();
                setCurrent(current + 1);
            }, 400);
        };
    };

    function clearColor() {
        setUno("topleft");
        setDos("topright");
        setTres("bottomleft");
        setCuatro("bottomright");
    };

    function one() {
        let audio = document.getElementById("clip1");
        audio.play();
        setUno("topleft uno");
        setTimeout(clearColor,350);
    }

    function dos() {
        let audio = document.getElementById("clip2");
        audio.play();
        setDos("topright dos");
        setTimeout(clearColor,350);
    }

    function tres() {
        let audio = document.getElementById("clip3");
        audio.play();
        setUno("bottomleft tres");
        setTimeout(clearColor,350);
    }

    function cuatro() {
        let audio = document.getElementById("clip4");
        audio.play();
        setUno("bottomright cuatro");
        setTimeout(clearColor,350);
    }

    function ftopLeft() {

    }

    function ftopRight() {

    }

    function fbottomRight() {

    }

    function fbottomLeft() {

    }

    return (
        <div className="Container">
        <audio id="clip1">
              <source src={clip1}></source>
        </audio>
        <audio id="clip2">
              <source src={clip2}></source>
        </audio>
        <audio id="clip3">
              <source src={clip3}></source>
        </audio>
        <audio id="clip4">
              <source src={clip4}></source>
        </audio>
        <div className="Izq">
            <h1>SIMON!</h1>
            {language === "spanish" ? <h3>por Marcelo Spagnuolo</h3> : <h3>by Marcelo Spagnuolo</h3>}
            <img src={simon} alt="Simon"/>
            {language == "spanish" ? 
            <p>Una recreación de la vieja consola de juegos Simón.<br/>
                Este juego fue creado por Ralph Baer y Howard J. 
                Morrison en 1978.<br/>
                Aunque marcó toda una época, unicamente podían
                acceder a él los niños de familias adineradas.</p>
                :
                <p>A recreation of the old Simon game console. <br/>
                This game was created by Ralph Baer and Howard J.
                Morrison in 1978. <br/>
                Although it marked an entire era, they could only
                children from wealthy families access it.</p>}
            <div className="lengua">
                <div>
                    <img src={eeuu} alt="eeuu" onClick={() => setLanguage("english")}/>
                    <span>english</span>
                </div>
                <div>
                    <img src={spain} alt="spain" onClick={() => setLanguage("spanish")} />
                    <span>español</span>
                </div>
            </div>
            
        </div>
        <div className="simon">
        <div className={suno} onClick={() => ftopLeft()}></div>
        <div className={sdos} onClick={() => ftopRight()}></div>
        <div className={stres} onClick={() => fbottomLeft()}></div>
        <div className={scuatro} onClick={() => fbottomRight()}></div>
        <div id="inner-circle">
            <div id="title" className="font-effect-emboss">SIMON!</div>
            <div id="switches">
                <input type="checkbox" className="toggle" id="on" onClick={(e) => power(e)} defaultChecked={on}/>
                <button className="button" id="start" onClick={() => start()}>Start</button>
                <input type="checkbox" className="toggle" id="strict" onChange={(e) => Strict(e)} defaultChecked="true"/>
            </div>
            <div className="text1">
                <span>POWER</span><span>STRICT</span>
            </div>
            <div className="turn" id="turno">{turn}</div>
            <div className="text2">
                COUNT
            </div>
        </div>
        </div>
        <div className="Der">
            {language === "spanish" ?
            <div>
                <h3>Indicaciones</h3>
                <p>El objetivo del juego es seguir la secuencia generada
                por la consola.<br/>
                Para ganar hay que completar 20 turnos, o sea, hay que 
                recordar la secuencia de 20 posiciones.<br/>
                El juego cuenta con el modo estricto en donde si se comete
                un error se reinicia el juego y se comienza de cero y el modo
                normal en donde si se comete un error, la maquina repite la
                ultima secuencia y da la oportunidad de reintentar sin perder
                ningun turno.</p>
            </div>
            :
            <div>
                <h3>Rules</h3>
                <p>The objective of the game is to follow the generated sequence
                through the console. <br/>
                To win you have to complete 20 turns, that is, you have to
                remember the sequence of 20 positions. <br/>
                The game has the strict mode where if you commit
                an error restarts the game and starts from scratch and the mode
                normal where if a mistake is made, the machine repeats the
                last sequence and gives the opportunity to retry without losing
                no shift.</p>
            </div>}
            {language === "spanish" ? <h3>Tecnologías</h3> : <h3>Skills</h3> }
            <div className="skills">
                <div className="tecno">
                    <img src={js} alt="Javascript" />
                    <span>Javascript</span>
                </div>
                <div className="tecno">
                    <img src={react} alt="React" />
                    <span>React</span>
                </div>
                <div className="tecno">
                    <img src={hooks} alt="Hooks" />
                    <span>Hooks</span>
                </div>
                <div className="tecno">
                    <img src={html} alt="html" />
                    <span>HTML</span>
                </div>
                <div className="tecno">
                    <img src={css} alt="css" />
                    <span>CSS</span>
                </div>
            </div>
        </div>
    </div>
    )

}

export default Home;