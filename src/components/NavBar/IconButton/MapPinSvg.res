@react.component
let make = () => {
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--grey)">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /> <circle cx="12" cy="10" r="3" />
  </svg>->React.cloneElement({
    "strokeLinecap": "round",
    "strokeWidth": "2",
    "strokeLinejoin": "round",
  })
}
