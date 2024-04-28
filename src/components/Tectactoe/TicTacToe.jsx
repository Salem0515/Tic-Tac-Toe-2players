import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../Assets/circle.png';
import cross_icon from '../Assets/cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

export const TicTacToe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLocks] = useState(false);
  let [clickedBoxes, setClickedBoxes] = useState(Array(9).fill(false)); // Track clicked boxes
  let titleRef = useRef(null);

  const toggle = (e, num) => {
    if (lock || clickedBoxes[num]) {
      return;
    }

    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}'>`;
      data[num] = "x";
      setCount(count + 1);
    } else {
      e.target.innerHTML = `<img src='${circle_icon}'>`;
      data[num] = "o";
      setCount(count + 1);
    }

    checkwin();
    setClickedBoxes(prevState => {
      const newState = [...prevState];
      newState[num] = true;
      return newState;
    });
  };

  const checkwin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    }
    else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    }
    else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    }
    else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    }
    else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    }
    else if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    }
    else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    }
  }

  const won = (winner) => {
    setLocks(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `congratulation: <img src="${cross_icon}"> wins`
    }

    else {
      titleRef.current.innerHTML = `congratulation: <img src="${circle_icon}"> wins`

    }
  }

  const reset = () => {
    setLocks(false);
    setCount(0);
    setClickedBoxes(Array(9).fill(false));
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = 'Tic Tac Toe in <span>React</span>';
    document.querySelectorAll('.boxes').forEach(box => (box.innerHTML = ''));
  };

  return (
    <div className='container'>
      <h1 className="title" ref={titleRef}>Tic Tac toe <span>React</span></h1>
      <div className="board">
        <div className="row1">
          <div className="boxes" onClick={(e) => toggle(e, 0)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 1)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 2)}></div>
        </div>
        <div className="row2">
          <div className="boxes" onClick={(e) => toggle(e, 3)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 4)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 5)}></div>
        </div>
        <div className="row3">
          <div className="boxes" onClick={(e) => toggle(e, 6)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 7)}></div>
          <div className="boxes" onClick={(e) => toggle(e, 8)}></div>
        </div>
      </div>
      <button className="reset" onClick={reset}>Reset</button>
    </div>
  );
};