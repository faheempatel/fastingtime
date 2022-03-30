// {..} means we are handling a JS object with an unknown
// set of attributes
@module external styles: {..} = "./Button.module.css"

@react.component
let make = (~children, ~onClick, ~ariaLabel) => {
  <button className={styles["container"]} ariaLabel onClick={onClick}> children </button>
}
