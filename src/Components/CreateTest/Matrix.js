

export default function Matrix(){


  return (
    <Box id="matrix1" className="matrix" ref={divRef}
      onDragOver={handleDragOver} onDrop={handleDrop}
      sx={{ width: matrix_size, height: matrix_size }}
    >
      <Stage ref={stage1_Ref} className="stage" width={dimensions.width} height={dimensions.height}  >
        <Layer className="layer">

          <Rect class="bg-color-rect" width={matrix_size} height={matrix_size} x={0} y={0} fill="white" stroke={layer_color} />{/* background color, do not remove */}
          {shapes1.map(s => <Rect key={s.id} {...s} />)}

        </Layer>
      </Stage>
    </Box>
  )
}