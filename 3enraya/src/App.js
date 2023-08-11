import React from "react";
import {useState} from 'react'
import { createRoot } from "react-dom/client";
function calculateWinner(tablero){
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for(let i=0; i<lines.length; i++){
    let [a,b,c] = lines[i];
    if(tablero[a]!=null && tablero[a] === tablero[b] && tablero[b] === tablero[c] && tablero[a]===tablero[c]){
      console.log('ENHORABUENA A ' + tablero[a])
      return true;
    }
  }
  return false;
}

function Square({value, clickEnCasilla}){
  return(
    <button className="square" onClick={clickEnCasilla}>{value}</button>
  )
}

function Board({xNext, tableroActual, updateTablero}) {
  function clickEnCasilla2(i){
    if(!calculateWinner(tableroActual)){
      let nextTablero = tableroActual.slice();
      if(nextTablero[i]!= null){
        return;
      }
      nextTablero[i] = (xNext ? "X" : "O");
      updateTablero(nextTablero);
    }else{
      return;
    }
  }
  let status;
  if(!calculateWinner(tableroActual)){
    status = "El siguiente turno es para " + (xNext ? "X" : "O");
  }else{
    status = "El ganador es " + (!xNext ? "X" : "O");
  }
  return(
    
    <div>
      <div className="status">{status}</div>
      <div>
        <div className="board-row">
          <Square value={tableroActual[0]} clickEnCasilla={() =>clickEnCasilla2(0)}/>
          <Square value={tableroActual[1]} clickEnCasilla={() =>clickEnCasilla2(1)}/>
          <Square value={tableroActual[2]} clickEnCasilla={() =>clickEnCasilla2(2)}/>
        </div>  
        <div className="board-row">
          <Square value={tableroActual[3]} clickEnCasilla={() =>clickEnCasilla2(3)}/>
          <Square value={tableroActual[4]} clickEnCasilla={() =>clickEnCasilla2(4)}/>
          <Square value={tableroActual[5]} clickEnCasilla={() =>clickEnCasilla2(5)}/>
        </div>
        <div className="board-row">
          <Square value={tableroActual[6]} clickEnCasilla={() =>clickEnCasilla2(6)}/>
          <Square value={tableroActual[7]} clickEnCasilla={() =>clickEnCasilla2(7)}/>
          <Square value={tableroActual[8]} clickEnCasilla={() =>clickEnCasilla2(8)}/>
        </div>
      </div>
    </div>
  );
}

export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, updateCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function updateHistory(nextTablero){ //revisar esto
    const nextHistory = [...history.slice(0, currentMove + 1), nextTablero];
    setHistory(nextHistory);
    updateCurrentMove(nextHistory.length-1); //no se actualizaba la pantalla hasta que no acabara de renderizarse todo, entonces no había actualización del movimiento
  }
  function saltarAlMovimientoN(move){ //revisar esto
    updateCurrentMove(move);
    
  }
  const moves = history.map((squares, move) => { //como va a devolver una lista de componentes de react
    //es necesario darle una key a cada elemento
    let description;
    if (move > 0) {
      description = 'Ir al movimiento #' + move;
    } else {
      description = 'Ir al inicio del juego';
    }
    return (
      <li key={move}>
        <button onClick={() => saltarAlMovimientoN(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board xNext={xIsNext} tableroActual ={currentSquares} updateTablero = {(varia) =>updateHistory(varia)}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
//falta solucionar lo del doble click y ver por qué hicimos el cambio de la variable xIsNext por esto
//la cosa es que se guarda el historial y se crea el boton sin actualizar la pantalla, es decir, va uno siempre por detras