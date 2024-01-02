import React, { useState, useEffect } from "react";
import SudokuGrid from "./SudokuGrid";
import { checkSudoku, generateSudoku, getData, highLight, instantCheck, setData } from "./Utils";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Loading from "./Loading";

function Game() {
  const params = useParams();
  const id = params.id;
  const [staticSudoku, setStaticSudoku] = useState([]);
  const [history, setHistory] = useState(() => {
    // TODO: Fetch history data from KV and restore the whole game
    getData(id).then((data) => {
      if (data === null) {
        console.log("No data found for " + id);
      } else {
        console.log(data);
        setHistory(data);
        setStaticSudoku(JSON.parse(JSON.stringify(data[0])));
        if (checkSudoku(data[data.length-1])) {
          alert("Welcome back! You've completed the puzzle last time!");
        }
      }
      setIsLoaded(true);
    });

    let history = [];
    let s = generateSudoku();
    history.push(s);
    setStaticSudoku(JSON.parse(JSON.stringify(s)));
    return history;
  });
  const [current, setCurrent] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  // Change Handler
  const handleCellChange = (value, row, col) => {
    let sudoku = history[current];
    const newSudoku = JSON.parse(JSON.stringify(sudoku));
    newSudoku[row][col] = parseInt(value);
    let newHistory = history.slice(0, current + 1);
    newHistory.push(newSudoku);
    
    setHistory(newHistory);
    setData(id, newHistory).then(() => {
        console.log("History saved");
    });
    let [res, reason, loc] = instantCheck(newHistory[newHistory.length - 1]);
    highLight(res, reason, loc);
  };

  

  

  // Hooks Effect
  useEffect(() => {
    setCurrent(history.length - 1);
  }, [history]);

  useEffect(() => {
    console.log("current pointer is changed!")
  }, [current]);

  // Button Handler
  const newGame = () => {
    const new_id = uuidv4();
    navigate(`/game/${new_id}`);
    window.location.reload();
    // const newSudoku = generateSudoku();
    // setStaticSudoku(JSON.parse(JSON.stringify(newSudoku)));
    // setHistory([newSudoku]);
  };

  const clearBoard = () => {
    setHistory([staticSudoku]);
  };

  const check = () => {
    let res = checkSudoku(history[current]);
    setIsValid(res);
    if (res) {
        alert("Congrats! You've completed the puzzle!");
    } else {
        alert("Not there yet. Keep going.")
    }
  };

  const backwards = () => {
    setCurrent(current > 0 ? current - 1 : current);
  };

  const forwards = () => {
    setCurrent(current < history.length - 1 ? current + 1 : current);
  };

  if (isLoaded) {
    return (
      <div className="App">
        <h1>Sudoku</h1>
        <h3>Steps recorded: {history.length}</h3>
        <button onClick={newGame}>NewGame</button>
        <button onClick={clearBoard}>StartOver</button>
        <button onClick={check}>Check</button> 
        <SudokuGrid
          sudoku={current >= history.length ? history[history.length - 1] : history[current]}
          onChange={handleCellChange}
          isDisabled={(row, col) => staticSudoku[row][col] !== 0}
        />
        <button onClick={backwards}>Step Back</button>
        <button onClick={forwards}>Step Forward</button>
      </div>
    );
  } else {
    return <Loading/>;
  }

  
}

export default Game;
