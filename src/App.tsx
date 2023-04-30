import { useEffect, useState } from 'react';
import './App.css';
import Board from './components/board/Board';
import {  Data } from './types/models';
import { SudokuService } from './services/SudokuService';
import { SolvedAndRawData } from './types/props';

function App() {
  const [solvedAndRawData, setSolvedAndRawData] = useState<SolvedAndRawData>(SudokuService.getSolvableGameWithSolution());
  const [currentBoard, setCurrentBoard] = useState<Data>(solvedAndRawData.raw);

  return (
    <>
      <h1 className='text-center'>Sudoku Sensei</h1>
      <div className='flex content-center w-1'>
        <Board data={currentBoard}/>
      </div>
    </>
  );
}

export default App;
