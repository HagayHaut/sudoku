import { useState } from 'react';
import './App.css';
import Board from './components/board/Board';
import { CellValue, Data } from './types/models';

const board: Data = Array(9).fill([]).map(_ => Array(9).fill(0));

function App() {
  

  return (
    <>
      <h1 className='text-center '>Sudoku Sensei</h1>
      <Board data={board}/>
    </>
  );
}

export default App;
