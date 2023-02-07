import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Circle, Layer, Rect, Stage } from "react-konva";
import '../../App.css'


export default function Canvas() {
  const divRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: null, height: null });

  //Utility debounce function
  function debounce(fn, ms) {
    let timer
    return _ => {
      clearTimeout(timer)
      timer = setTimeout(_ => {
        timer = null
        fn.apply(this, arguments)
      }, ms)
    };

  }

  //Set stage's dimensions because it only takes pixel values as its dimensions
  const handleResize = () => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight
      })
      console.log(`Rendering at ${dimensions.width} x ${dimensions.height}`)
    }
  }

  //For initial render
  useEffect(() => { handleResize() }, [])
  //To control resize. In the future, may try using Stage's scale to make it fully responsive
  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 500)

    window.addEventListener('resize', debouncedHandleResize);
    return () => window.removeEventListener('resize', debouncedHandleResize)
  })

  const denom = 6;
  const layer_size = 400;
  return (<Box id="canvasContainer" ref={divRef} >

    <Box id="toolbox" >
      Yo waddup
    </Box>


    <Box id="canvasWorkspace">
      <Stage className="stage" width={dimensions.width/denom} height={dimensions.height/denom}>
        <Layer className="layer" width={layer_size} height={layer_size}>
          <Rect width={100} height={100} x={10} y={10} fill="blue" />
          <Rect width={100} height={100} x={100} y={100} fill="blue" />
        </Layer>

      </Stage>

    </Box>


    <Box id="rightBar">
      Yo waddup
    </Box>


  </Box>);
}