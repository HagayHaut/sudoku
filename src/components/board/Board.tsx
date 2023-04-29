import React from 'react';
import Cell from '../cell/Cell';
import { BoardProps } from '../../types/props';
import { Coordinate, Coordinates } from '../../types/models';

function Board({ data }: BoardProps) {

  return (
    <div className='w-80 h-82 border-2 border-black grid-cols-9'>
        {
          data.map((row, r) => {
            return (
              <div className='flex' key={r}>
                {
                  row.map((num, c) => {
                    return <Cell key={c} value={num} coordinates={[r, c] as Coordinates}/>
                  })
                }
              </div>
            )
          })
        }
    </div>
  )
}

export default Board;