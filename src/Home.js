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
    const [language,setLanguage] = useState("spanish")
    var topLeft;
    var topRight;
    var bottomLeft;
    var bottomRight;
    var intervalId;
    var compTurn;
    var flash;
    var on = false;
    var win = false;
    var turn = 0;
    var order = [];
    var good = true;
    var playerOrder = [];
    var noise = true;
    var strict = true;
    var turnCounter;
    

    function power(e) {
        on = e.target.checked;
        topLeft = document.querySelector("#topleft");
        topRight = document.querySelector("#topright");
        bottomLeft = document.querySelector("#bottomleft");
        bottomRight = document.querySelector("#bottomright");
        turnCounter = document.getElementById("turno")
        if(on) {
            turnCounter.innerHTML = "-"
        } else {
            turnCounter.innerHTML = ""
        }
    }

    function Strict(e) {
        strict = e.target.checked;
    }

    function start() {
        if(on || win) {
            play()
        }
    }

    function play() {
        win = false;
        order = [];
        playerOrder = [];
        turn = 1;
        good = true;
        flash = 0;
        turnCounter.innerHTML = turn;
        for(let i = 0; i < 20; i++) {
            order.push(Math.floor(Math.random() * 4) + 1)
        }
        compTurn = true;
        intervalId = setInterval(gameTurn,800);
    }

    function gameTurn() {
        on = false;

        if(flash == turn) {
            clearInterval(intervalId);
            compTurn = false;
            clearColor();
            on = true;
        };

        if(compTurn) {
            setTimeout(() => {
                if(order[flash] == 1) one();
                if(order[flash] == 2) dos();
                if(order[flash] == 3) tres();
                if(order[flash] == 4) cuatro();
                flash++;
            }, 400);
        };
    };

    function one() {
        if(noise){
            let audio = document.getElementById("clip1");
            audio.play()
        };
        noise = true;
        topLeft.style.backgroundColor = "lightgreen";
        setTimeout(clearColor,350);
    };

    function dos() {
        if(noise){
            let audio = document.getElementById("clip2");
            audio.play();
        }
        noise = true;
        topRight.style.backgroundColor = "tomato";
        setTimeout(clearColor,350);
    };

    function tres() {
        if(noise){
            let audio = document.getElementById("clip3");
            audio.play();
        };
        noise = true;
        if(!bottomLeft) {
            bottomLeft = document.querySelector("#bottomleft");
        }
        bottomLeft.style.backgroundColor = "yellow";
        setTimeout(clearColor,350);
    };

    function cuatro() {
        if(noise){
            let audio = document.getElementById("clip4");
            audio.play();
        };
        noise = true;
        bottomRight.style.backgroundColor = "lightskyblue";
        setTimeout(clearColor,350);
    };

    function clearColor() {
        topLeft.style.backgroundColor = "darkgreen";
        topRight.style.backgroundColor = "darkred";
        bottomLeft.style.backgroundColor = "goldenrod";
        bottomRight.style.backgroundColor = "darkblue";
    };

    function flashColor() {
        topLeft.style.backgroundColor = "lightgreen";
        topRight.style.backgroundColor = "tomato";
        bottomLeft.style.backgroundColor = "yellow";
        bottomRight.style.backgroundColor = "lightskyblue";
    };

    function ftopLeft() {
        if(on) {
            on = false;
            playerOrder.push(1);
            check();
            one();
            if(!win) {
                setTimeout(() => {
                    clearColor();
                }, 200);
            };
            on = true
        };
    };

    function ftopRight() {
        if(on) {
            on = false;
            playerOrder.push(2);
            check();
            dos();
            if(!win) {
                setTimeout(() => {
                    clearColor();
                }, 200);
            };
            on = true
        };
    };

    function fbottomLeft() {
        if(on) {
            on = false
            playerOrder.push(3);
            check();
            tres();
            if(!win) {
                setTimeout(() => {
                    clearColor();
                }, 200);
            };
            on = true;
        };
    };

    function fbottomRight() {
        if(on) {
            on = false;
            playerOrder.push(4);
            check();
            cuatro();
            if(!win) {
                setTimeout(() => {
                    clearColor();
                }, 200);
            };
            on = true;
        };
    };

    function check() {
        if(playerOrder[playerOrder.length - 1] !== order[playerOrder.length - 1]) {
            good = false;
        };

        if(playerOrder.length == 20 && good) {
            winGame();
        };

        if(!good) {
            flashColor();
            turnCounter.innerHTML = "NO!";
            setTimeout(() => {
                turnCounter.innerHTML = turn;
                clearColor();

                if(strict) {
                    play();
                } else {
                    compTurn = true;
                    flash = 0;
                    playerOrder = [];
                    good = true;
                    intervalId = setInterval(gameTurn,800);
                };
            }, 800);
            noise = false;
        };

        if(turn == playerOrder.length && good && !win) {
            turn++;
            playerOrder = [];
            compTurn = true;
            flash = 0;
            turnCounter.innerHTML = turn;
            intervalId = setInterval(gameTurn, 800);
        };
    };

    function winGame() {
        flashColor();
        turnCounter.innerHTML = "WIN!"
        on = false;
        win = true;
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
            <div id="topleft" onClick={() => ftopLeft()}></div>
            <div id="topright" onClick={() => ftopRight()}></div>
            <div id="bottomleft" onClick={() => fbottomLeft()}></div>
            <div id="bottomright" onClick={() => fbottomRight()}></div>
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
                <div className="turn" id="turno"></div>
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
    );

};

export default Home;