import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
  const [state, setState] = useState(Array(9).fill(null));
  const [isXTurn, setXTurn] = useState(true);
  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (state[a] && state[a] === state[b] && state[a] === state[c]) {
        return state[a];
      }
    }
    return null;
  };
  const handleClick = (index) => {
    if (state[index] !== null) {
      return null;
    }
    const copyState = [...state];
    copyState[index] = isXTurn ? "X" : "O";
    setState(copyState);
    setXTurn(!isXTurn);
  };
  const st = (start) => {
    const items = [];
    for (let i = start; i < start + 3; i++) {
      items.push(<Square onClick={() => handleClick(i)} value={state[i]} />);
    }
    return items;
  };
  var isWinner = checkWinner();
  const handleRequest = () => {
    const initState = Array(9).fill(null);
    setState(initState);
    console.log(isWinner);
  };
  return (
    <div className="board-container">
      {isWinner ? (
        <>
          <h1>
            {isWinner} is the Winner{" "}
            <button onClick={() => handleRequest()}>Play Again</button>{" "}
          </h1>
        </>
      ) : (
        <>
          <h1>Player {isXTurn ? "X" : "O"} it's your Turn </h1>
          <div className="board-row">{st(0)}</div>
          <div className="board-row">{st(3)}</div>
          <div className="board-row">{st(6)}</div>
        </>
      )}
    </div>
  );
};
export default Board;
