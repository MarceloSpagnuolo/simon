import React from "react";
import "./Right.css";
import js from "../../assets/js.png";
import html from "../../assets/html.png";
import hooks from "../../assets/hooks.png";
import react from "../../assets/react.png";
import css from "../../assets/css.png";

function Right({ language }) {
  return (
    <div className="Der">
      {language === "spanish" ? (
        <div>
          <h3>Indicaciones</h3>
          <p>
            El objetivo del juego es seguir la secuencia generada por la
            consola.
            <br />
            Para ganar hay que completar 20 turnos.
            <br />
            El juego cuenta con el modo estricto en donde si se comete un error
            se reinicia el juego y se comienza de cero y el modo normal en donde
            si se comete un error, la maquina repite la ultima secuencia y da la
            oportunidad de reintentar sin perder ningun turno.
          </p>
        </div>
      ) : (
        <div>
          <h3>Rules</h3>
          <p>
            The objective of the game is to follow the generated sequence
            through the console. <br />
            To win you have to complete 20 turns, that is, you have to remember
            the sequence of 20 positions. <br />
            The game has the strict mode where if you commit an error restarts
            the game and starts from scratch and the mode normal where if a
            mistake is made, the machine repeats the last sequence and gives the
            opportunity to retry without losing no shift.
          </p>
        </div>
      )}
      {language === "spanish" ? <h3>Tecnologías</h3> : <h3>Skills</h3>}
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
  );
}

export default Right;
