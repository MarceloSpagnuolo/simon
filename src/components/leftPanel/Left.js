import React from "react";
import "./Left.css";
import spain from "../../assets/spain2.png";
import eeuu from "../../assets/eeuu.png";
import simon from "../../assets/simon.jpg";

function Left({ language, changeLanguage }) {
  return (
    <div className="Izq">
      <h1>SIMON!</h1>
      {language === "spanish" ? (
        <h3>por Marcelo Spagnuolo</h3>
      ) : (
        <h3>by Marcelo Spagnuolo</h3>
      )}
      <img src={simon} alt="Simon" />
      {language === "spanish" ? (
        <p>
          Una recreación de la vieja consola de juegos Simón.
          <br />
          Este juego fue creado por Ralph Baer y Howard J. Morrison en 1978.
          <br />
          Aunque marcó toda una época, unicamente podían acceder a él los niños
          de familias adineradas.
        </p>
      ) : (
        <p>
          A recreation of the old Simon game console. <br />
          This game was created by Ralph Baer and Howard J. Morrison in 1978.{" "}
          <br />
          Although it marked an entire era, they could only children from
          wealthy families access it.
        </p>
      )}
      <div className="lengua">
        <div>
          <img
            src={eeuu}
            alt="eeuu"
            onClick={() => changeLanguage("english")}
          />
          <span>english</span>
        </div>
        <div>
          <img
            src={spain}
            alt="spain"
            onClick={() => changeLanguage("spanish")}
          />
          <span>español</span>
        </div>
      </div>
    </div>
  );
}

export default Left;
