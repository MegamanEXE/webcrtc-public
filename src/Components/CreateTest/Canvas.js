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
        width: divRef.current.offsetWidth - 20,
        height: divRef.current.offsetHeight,
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
  const layer_color = "grey"
  const layer_gap = 15;
  var center_offset = dimensions.width*0.1; //calculate this properly later
  return (<Box id="canvasContainer">

    <Box id="toolbox" >
      Yo waddup
    </Box>


    <Box id="canvasWorkspace" ref={divRef}>
      {/* <Stage className="stage" width={dimensions.width/denom} height={dimensions.height/denom}> */}

      <Stage className="stage" width={dimensions.width} height={dimensions.height}>
        <Layer id="box1" className="layer" x={center_offset} width={layer_size} height={layer_size}>
          <Rect class="bg-color-rect" width={layer_size} height={layer_size} x={0} y={0} fill="white" stroke={layer_color}
          onClick={()=>{console.log("Layer clicked")}}
          />{/* background color, do not remove */}

          <Rect width={100} height={100} x={10} y={10} fill="blue" draggable="true" />
          <Rect width={100} height={100} x={100} y={100} fill="blue" />
        </Layer>

        <Layer id="box2" x={center_offset + layer_size + layer_gap} y={0} className="layer" width={layer_size} height={layer_size}>
          <Rect width={layer_size} height={layer_size} x={0} y={0} fill="white" stroke={layer_color} />

          <Rect width={50} height={100} x={10} y={10} fill="lightblue" />
          <Rect width={50} height={100} x={100} y={100} fill="green" />
        </Layer>

        <Layer id="box3" x={center_offset + layer_size*2 + layer_gap*2} y={0} className="layer" width={layer_size} height={layer_size}>
          <Rect width={layer_size} height={layer_size} x={0} y={0} fill="white" stroke={layer_color} />

          <Rect width={50} height={100} x={10} y={10} fill="lightblue" />
          <Rect width={50} height={100} x={100} y={100} fill="green" />
        </Layer>

      </Stage>

    </Box>


    <Box id="rightBar">
      Yo waddup
    </Box>


  </Box>);
}