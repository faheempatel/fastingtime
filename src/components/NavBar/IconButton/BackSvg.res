@react.component
let make = () => {
  <svg width="16px" fill="none" viewBox="0 0 9 14" xmlns="http://www.w3.org/2000/svg">
    <g stroke="#000"> <path d="m2 7 5-5" /> <path d="m2 7 5 5" /> </g>
  </svg>->React.cloneElement({"stroke-linecap": "round", "stroke-width": "2"})
}
