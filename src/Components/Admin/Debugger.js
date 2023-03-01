
import { useEffect, useState } from 'react';
import componentLibraries from '../../data/componentLibraries.json'
import GestureRecognizer from '@2players/dollar1-unistroke-recognizer';

export default function Debugger()  {
  const gr = new GestureRecognizer({ defaultStrokes: false });
  const stroke = [
    310, 230 ,
     333, 186 ,
    
  ]

  gr.add('a-name', [
    { x: 310, y: 230 },
    { x: 333, y: 186 },
    { x: 356, y: 215 },
    { x: 375, y: 186 },
    { x: 399, y: 216 },
    { x: 418, y: 186 },
  ])

  gr.add('b-name', [
    310, 230,
    333, 186,
  ])
 
  let x = gr.recognize(stroke, true)

  return (
    <div>{x}</div>
  )
}
