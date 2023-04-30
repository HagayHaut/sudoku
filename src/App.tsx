import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/board/Board';
import {  Data } from './types/models';
import { SudokuGenerator } from './services/SudokuService';
import { SolvedAndStartingData } from './types/props';

function App() {
  

  const [k, setK] = useState<number>(2);
  const [n, setN] = useState<number>(9);
  const [generator, setGenerator] = useState<SudokuGenerator>(new SudokuGenerator(n, k));
  const [solvedAndStartingData, setSolvedAndStartingData] = useState<SolvedAndStartingData>(generator.getSolvedAndStartingData());
  const [currentBoard, setCurrentBoard] = useState<Data>(solvedAndStartingData.starting);


  useEffect(() => {
    async function loadGenerator() {
      setGenerator(new SudokuGenerator(n, k));
      generator.generate();
    }
    loadGenerator().then(
      (_) => {
        setSolvedAndStartingData(generator.getSolvedAndStartingData());
        setCurrentBoard(solvedAndStartingData.starting);
      }
    );
  }, []);

  const generateNewGame = () => {
    setSolvedAndStartingData(generator.getSolvedAndStartingData());
    setCurrentBoard(solvedAndStartingData.starting)
  };

  return (
    <>
      <h1 className='text-center'>Sudoku Sensei</h1>
      <div className=''>
        <Board data={currentBoard}/>
        <button className='border border-black' onClick={(_) => generateNewGame()}>Generate new game</button>
      </div>
    </>
  );
}

export default App;
