import { createSvgIcon, SvgIcon } from "@mui/material";

/*
Categories created manually on https://uxwing.com/svg-icon-editor/ Size: 48x48, Stroke: 2, stroke="#8b8b8b"
The actual shapes icons created on Adobe Illustrator
Converted to this format using https://react-svgr.com/playground/
*/


const config = {width:'48', height:'48', viewBox:"0 0 48 48"}

export const LinesIcon = (props) => (
  <svg {...config} xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{"Layer 1"}</title>
    <path d="M47.199 47.186h-5.241l5.24-5.24v5.24z" />
    <g strokeWidth={2} stroke="#8b8b8b" fill="none">
      <path d="M41.145 18.886 15.656 44.375" />
      <path
        d="M18.012 34.818c-13.771-11.522-5.643-28.29-.09-30.514"
        opacity="NaN"
      />
    </g>
  </svg>
)

export const RectanglesIcon = (props) => (
  <svg {...config} xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{"Layer 1"}</title>
    <g stroke="#8b8b8b" strokeWidth={2} fill="#fff">
      <path d="M14.589 18.1 30.21 2.479l15.621 15.62L30.21 33.722 14.589 18.1z" />
      <path d="M2.169 23.242h22.28v22.28H2.169z" />
    </g>
    <path d="M47.199 47.186h-5.241l5.24-5.24v5.24z" />
  </svg>
)

export const CrossesIcon = (props) => (
  <svg {...config}  xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{"Layer 1"}</title>
    <path d="M47.199 47.186h-5.241l5.24-5.24v5.24z" />
    <g stroke="#8b8b8b" strokeWidth={2} fill="none">
      <path d="M12.647 1.442v24.121M24.82 12.716H.699" />
    </g>
    <g strokeWidth={2} stroke="#8b8b8b" fill="none">
      <path d="M29.519 17.914v14.887M29.701 31.973 18.704 42.97M40.65 43.195 29.655 32.197" />
    </g>
  </svg>
)

export const CirclesIcon = (props) => (
  <svg {...config} xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{"Layer 1"}</title>
    <path d="M47.199 47.186h-5.241l5.24-5.24v5.24z" />
    <circle
      cy={16.81}
      cx={17.529}
      strokeWidth={2}
      stroke="#8b8b8b"
      fill="none"
      r={11.781}
    />
    <ellipse
      transform="rotate(47.225 31.633 32.573)"
      ry={14.823}
      rx={3.982}
      cy={32.573}
      cx={31.633}
      strokeWidth={2}
      stroke="#8b8b8b"
      fill="none"
    />
  </svg>
)

export const TrianglesIcon = (props) => (
  <svg {...config} xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{"Layer 1"}</title>
    <path d="M47.199 47.186h-5.241l5.24-5.24v5.24z" />
    <path
      stroke="#8b8b8b"
      d="M19.116 25.69 30.344 6.04 41.57 25.69H19.116zM6.814 41.717V22.912l18.805 18.805H6.814z"
      strokeWidth={2}
      fill="#fff"
    />
  </svg>
)

export const HexagonsIcon = (props) => (
  <svg {...config} xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{"Layer 1"}</title>
    <path d="M47.199 47.186h-5.241l5.24-5.24v5.24z" />
    <path
      stroke="#8b8b8b"
      d="m7.13 24 7.23-14.46h19.28L40.87 24l-7.23 14.46H14.36L7.13 24z"
      strokeWidth={2}
      fill="#fff"
    />
  </svg>
)

export const DotsIcon = (props) => (
  <svg {...config} xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>{"Layer 1"}</title>
    <path d="M47.199 47.186h-5.241l5.24-5.24v5.24z" />
    <g strokeWidth={2} stroke="#8b8b8b" fill="#fff">
      <path d="M23.558 25.936h3.761v3.761h-3.761zM36.72 25.936h3.761v3.761H36.72zM36.72 38.775h3.761v3.761H36.72zM23.608 38.775h3.761v3.761h-3.761z" />
    </g>
    <g stroke="#8b8b8b" strokeWidth={2} fill="#fff">
      <circle cy={5.209} cx={19.836} r={1.74} />
      <circle cy={18.53} cx={19.836} r={1.74} />
      <circle cy={5.109} cx={5.652} r={1.74} />
      <circle cy={18.842} cx={5.687} r={1.74} />
    </g>
  </svg>
)


/*
These are created as 24x24 so no additional processing is needed as per MUI documentation
Created in Adobe Illustrator but any software should work, the above ones were made in an online tool
SVG code was directly pulled from the software/svgr playground so files don't exist for these
*/


const config2 = { width: '24', height: '24', viewBox: "0 0 48 48" }
//LINES

//Not used, left for experimentation
export const CLineIcon48 = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#000"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M24.372 3.47c-11.261 11.262-11.26 29.487 0 40.747"
    />
  </svg>
)

export const CLineIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8b8b8b"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M12.229 1.613c-5.655 5.655-5.654 14.807 0 20.461"
    />
  </svg>
)

export const EightLineIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="#8B8B8B"
      d="M12.96 11.999c1.194 1.521 2.504 3.099 2.504 5.511 0 2.504-1.45 4.291-3.463 4.291-1.85 0-3.465-1.908-3.465-4.529 0-2.205 1.38-3.842 2.504-5.272-1.192-1.518-2.504-3.098-2.504-5.508 0-2.531 1.45-4.29 3.463-4.292 1.851 0 3.465 1.907 3.465 4.529 0 2.2-1.381 3.841-2.504 5.27zm-.961 1.192c-.842 1.162-2.059 2.383-2.059 4.107 0 1.49.961 2.623 2.061 2.623 1.193 0 2.06-1.07 2.06-2.531 0-1.699-1.15-3.066-2.062-4.199zm0-9.114c-1.192.001-2.059 1.072-2.059 2.531 0 1.697 1.147 3.068 2.059 4.201.845-1.164 2.06-2.384 2.06-4.11 0-1.49-.958-2.622-2.06-2.622z"
    />
  </svg>
)

export const VerticalLineIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M12 2v20"
    />
  </svg>
)

export const TiltedLineIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M21.698 2.166 2.302 21.563"
    />
  </svg>
)

//RECTANGLES
export const DiamondIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={1.99998}
      strokeMiterlimit={10}
      d="m2.492 12 9.509-9.51L21.509 12 12 21.506z"
    />
  </svg>
)

export const TallFatRectIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M6 3h11v19H6z"
    />
  </svg>
)

export const TallThinRectIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M9 3h6v19H9z"
    />
  </svg>
)

export const TiltedRectIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M10.125 22h-6l9.75-19h6z"
    />
  </svg>
)

export const FoldedRectIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M14.613 7H8.056L1.861 17h6.557z"
    />
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M22.104 17h-6.557L9.351 7h6.556z"
    />
  </svg>
)

export const TallRectIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M5 2h13v20H5z"
    />
  </svg>
)
  
export const CRectIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M18 22H5V2h13"
    />
  </svg>
)

export const TopLeftRectIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M3 21V3h18"
    />
  </svg>
)

export const StarIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M4.206 4.205 12 6.489l7.795-2.283L17.512 12l2.283 7.795L12 17.512l-7.794 2.283L6.489 12z"
    />
  </svg>
)

export const StarMedIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M6.5 4.205 12 6.489l5.5-2.283L15.89 12l1.61 7.795-5.5-2.283-5.5 2.283L8.111 12z"
    />
  </svg>
)

export const StarThinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="m9 4.205 3 2.284 3-2.283L14.122 12 15 19.795l-3-2.283-3 2.283L9.879 12z"
    />
  </svg>
)

//CROSSES
export const PlusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M12 2v20M22 12H2"
    />
  </svg>
)

export const CrossIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M12 2v20M17 12H7"
    />
  </svg>
)

export const OrthogonalIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M12 3v12M23.334 21.722l-11.696-6.754M12.477 14.968.78 21.722"
    />
  </svg>
)

//CIRCLES
export const SemicircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M22 17c0-5.522-4.477-10-10-10C6.478 7 2 11.478 2 17h20z"
    />
  </svg>
)

export const CCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M17 2C11.478 2 7 6.477 7 12c0 5.522 4.478 10 10 10"
    />
  </svg>
)

export const Circle20MinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M18 1.965v11.758l-8.373 8.313c-2.128-2.129-3.415-5.068-3.415-8.313C6.212 7.232 11 1.965 18 1.965z"
    />
  </svg>
)

export const QuarterCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M22 2v20H2C2 11 11 2 22 2z"
    />
  </svg>
)

export const Circle10MinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M18 2.733v18.533L4.898 8.164C8.253 4.809 13 2.733 18 2.733z"
    />
  </svg>
)

export const EllipseVerticalIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <ellipse
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={12}
      cy={12.297}
      rx={3}
      ry={10.172}
    />
  </svg>
)

export const EllipseDiagonalIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <ellipse
      transform="rotate(45.001 12 12.297)"
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={12}
      cy={12.297}
      rx={3}
      ry={10.172}
    />
  </svg>
)

export const FoldedEllipseIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <g fill="none" stroke="#8B8B8B" strokeWidth={2} strokeMiterlimit={10}>
      <path d="M7.359 7H6.064c-3.521 4.168-5.281 8.161-4.039 9.403s5.113-.471 9.307-3.991c.22-.183.427-.339.647-.52-.686-.623-1.398-1.366-2.097-2.065C8.963 8.909 8.122 8.042 7.359 7zM14.076 9.84a61.325 61.325 0 0 1-2.097 2.029c.22.18.427.385.647.566 4.195 3.521 8.065 5.198 9.308 3.955 1.242-1.242-.519-5.223-4.039-9.391h-1.294c-.764 1.043-1.606 1.922-2.525 2.841z" />
      <path d="M7.359 7.191a43.956 43.956 0 0 0 2.523 2.744 59.88 59.88 0 0 0 2.097 1.981 59.88 59.88 0 0 0 2.097-1.981 44.317 44.317 0 0 0 2.525-2.744" />
    </g>
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M6 7h12"
    />
  </svg>
)

//TRIANGLES
export const SimpleTriangleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M4.226 19 12 5.535 19.773 19z"
    />
  </svg>
)

export const SimpleTriangleBigIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M2.257 20 12 3.125 21.742 20z"
    />
  </svg>
)

export const SimpleTriangleSmallIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M6.202 17 12 6.958 17.798 17z"
    />
  </svg>
)

export const SquashedTriangleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M4.226 15 12 8.268 19.773 15z"
    />
  </svg>
)

export const RightTriangleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M5 19V5.535L18.574 19z"
    />
  </svg>
)

export const RightTriangleThinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M15 22V6.268L8.822 22z"
    />
  </svg>
)

export const ObtuseTriangleBigIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M13.188 21 20 5.492 3.876 21z"
    />
  </svg>
)

export const ObtuseTriangleSmallIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="m12.631 16 3.441-7.833L7.928 16z"
    />
  </svg>
)

export const ObtuseTriangleSlightIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="m15.626 21 2.457-15.508L5.917 21z"
    />
  </svg>
)

export const ConeIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M9.385 22 12 7l2.615 15z"
    />
  </svg>
)

export const FoldedTriangleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeMiterlimit={10}
      d="m18.491 8.5-1.027 2.912-.046.148-1.395 3.94H4l9.453-6.797.231-.203z"
    />
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeMiterlimit={10}
      d="m21.292 14.307-3.828-2.915L18.491 8.5h.738zM17.464 11.454l-3.78-2.871"
    />
  </svg>
)

//HEXAGONS
export const SemihexagonIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M9 16.758V7.242l5-3.94v17.395z"
    />
  </svg>
)

export const CHexagonIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="m14 20.697-5-3.939V7.242l5-3.94"
    />
  </svg>
)

export const RhombusIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M17 12.408 6 21.44v-9.847L17 2.56z"
    />
  </svg>
)

//DOTS
export const DotHollowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <circle
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={12}
      cy={12}
      r={1.792}
    />
  </svg>
)

export const DotFilledIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <circle
      fill="#8B8B8B"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={12}
      cy={12}
      r={1.792}
    />
  </svg>
)

export const Dot4HollowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <circle
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={3}
      cy={3}
      r={1.792}
    />
    <circle
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={21}
      cy={3}
      r={1.792}
    />
    <circle
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={3}
      cy={21}
      r={1.792}
    />
    <circle
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={21}
      cy={21}
      r={1.792}
    />
  </svg>
)

export const Dot4FilledIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <circle
      fill="#8B8B8B"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={3}
      cy={3}
      r={1.792}
    />
    <circle
      fill="#8B8B8B"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={21}
      cy={3}
      r={1.792}
    />
    <circle
      fill="#8B8B8B"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={3}
      cy={21}
      r={1.792}
    />
    <circle
      fill="#8B8B8B"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      cx={21}
      cy={21}
      r={1.792}
    />
  </svg>
)

export const DotSquareHollowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeMiterlimit={10}
      d="M9.5 10.5h4v4h-4z"
    />
  </svg>
)

export const DotSquareFilledIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="#8B8B8B"
      stroke="#8B8B8B"
      strokeMiterlimit={10}
      d="M9.5 10.5h4v4h-4z"
    />
  </svg>
)

export const DotSquare4HollowIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M1 1h4v4H1zM19 1h4v4h-4zM1 19h4v4H1zM19 19h4v4h-4z"
    />
  </svg>
)

export const DotSquare4FilledIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="#8B8B8B"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="M1 1h4v4H1zM19 1h4v4h-4zM1 19h4v4H1zM19 19h4v4h-4z"
    />
  </svg>
)

//TEXTURE ICONS
export const RightDiagonalTextureIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="m9.583-15.917-29.041 29.042M12.584-12.917l-29.042 29.042M15.584-9.917l-29.042 29.042M18.584-6.917l-29.042 29.042M21.584-3.917-7.458 25.125M24.584-.917-4.458 28.125M27.584 2.083-1.458 31.125M30.584 5.083 1.542 34.125M33.584 8.083 4.542 37.125M36.584 11.083 7.542 40.125M39.584 14.084 10.542 43.125"
    />
  </svg>
)

export const LeftDiagonalTextureIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    xmlSpace="preserve"
    {...props}
  >
    <path
      fill="none"
      stroke="#8B8B8B"
      strokeWidth={2}
      strokeMiterlimit={10}
      d="m9.583 43.125-29.041-29.041M12.584 40.125l-29.042-29.041M15.584 37.125-13.458 8.084M18.584 34.125-10.458 5.084M21.584 31.125-7.458 2.084M24.584 28.125-4.458-.916M27.584 25.125-1.458-3.916M30.584 22.125 1.542-6.916M33.584 19.125 4.542-9.916M36.584 16.125 7.542-12.916M39.584 13.125 10.542-15.916"
    />
  </svg>
)
